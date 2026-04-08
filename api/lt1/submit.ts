import { isStrongSessionSecret, readSession } from "../_lib/session.js";
import { findForbiddenReason } from "../_lib/validation.js";
import { PayloadTooLargeError, readJson, sendJson } from "../_lib/http.js";
import { checkRateLimit } from "../_lib/rateLimit.js";
import { enforceCsrf, enforceJson } from "../_lib/requestGuard.js";
import { enforceFeatureEnabled } from "../_lib/featureFlag.js";
import { getTrustedIp } from "../_lib/trustedIp.js";
import { sanitizeDiscordText, sanitizeLog, validateDiscordWebhookUrl } from "../_lib/discord.js";

type SubmitPayload = {
  title?: string;
  description?: string;
};

export default async function handler(
  req: { method?: string; headers?: Record<string, string | undefined> } & AsyncIterable<Uint8Array>,
  res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
) {
  if (req.method !== "POST") {
    return sendJson(res, 405, { error: "Method not allowed." });
  }
  if (!enforceFeatureEnabled(res, "LT1_SUBMIT_ENABLED", true)) {
    return;
  }
  if (!enforceCsrf(req, res)) {
    return;
  }
  if (!enforceJson(req, res)) {
    return;
  }

  const sessionSecret = process.env.SESSION_SECRET;
  if (!sessionSecret) {
    return sendJson(res, 500, { error: "Missing session secret." });
  }
  if (!isStrongSessionSecret(sessionSecret)) {
    return sendJson(res, 500, { error: "Session secret is too weak." });
  }

  const session = readSession(req, sessionSecret);
  if (!session) {
    return sendJson(res, 401, { error: "Sign in with Discord first." });
  }

  const userKey = `lt1:submit:${session.sub}`;
  const userLimit = checkRateLimit(userKey, { limit: 5, windowMs: 10 * 60 * 1000 });
  if (!userLimit.allowed) {
    res.setHeader("Retry-After", Math.ceil(userLimit.retryAfterMs / 1000).toString());
    return sendJson(res, 429, { error: "Rate limit exceeded." });
  }

  const trustedIp = getTrustedIp(req.headers);
  if (trustedIp) {
    const ipKey = `lt1:submit-ip:${trustedIp}`;
    const ipLimit = checkRateLimit(ipKey, { limit: 30, windowMs: 10 * 60 * 1000 });
    if (!ipLimit.allowed) {
      res.setHeader("Retry-After", Math.ceil(ipLimit.retryAfterMs / 1000).toString());
      return sendJson(res, 429, { error: "Rate limit exceeded." });
    }
  } else {
    const globalKey = "lt1:submit-global";
    const globalLimit = checkRateLimit(globalKey, { limit: 60, windowMs: 10 * 60 * 1000 });
    if (!globalLimit.allowed) {
      res.setHeader("Retry-After", Math.ceil(globalLimit.retryAfterMs / 1000).toString());
      return sendJson(res, 429, { error: "Rate limit exceeded." });
    }
  }

  let body: SubmitPayload;
  try {
    body = await readJson<SubmitPayload>(req, { maxBytes: 16 * 1024 });
  } catch (error) {
    if (error instanceof PayloadTooLargeError) {
      return sendJson(res, 413, { error: "Payload too large." });
    }
    return sendJson(res, 400, { error: "Invalid JSON." });
  }

  const title = (body.title ?? "").toString().trim();
  const description = (body.description ?? "").toString().trim();

  if (!title) {
    return sendJson(res, 400, { error: "Title is required." });
  }
  if (title.length > 100) {
    return sendJson(res, 400, { error: "Title is too long." });
  }
  if (description.length > 1000) {
    return sendJson(res, 400, { error: "Description is too long." });
  }

  const titleProblem = findForbiddenReason(title);
  const descriptionProblem = findForbiddenReason(description);
  if (titleProblem || descriptionProblem) {
    return sendJson(res, 400, { error: "URLs and @ mentions are not allowed." });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  if (!webhookUrl) {
    return sendJson(res, 500, { error: "Webhook is not configured." });
  }

  let parsedWebhookUrl: URL;
  try {
    parsedWebhookUrl = validateDiscordWebhookUrl(webhookUrl);
  } catch {
    return sendJson(res, 500, { error: "Invalid webhook configuration." });
  }

  const displayName = session.globalName
    ? `${session.globalName} (${session.username})`
    : session.username;
  const safeDisplayName = sanitizeDiscordText(displayName);
  const safeTitle = sanitizeLog(title);

  const embed = {
    title: "LT Submission",
    color: 0x111827,
    fields: [
      { name: "Title", value: sanitizeDiscordText(title) },
      { name: "Description", value: sanitizeDiscordText(description || "N/A") },
      { name: "Submitted by", value: `${safeDisplayName}\nID: ${session.sub}` },
    ],
    timestamp: new Date().toISOString(),
  };

  console.log(`[LT1] Submission: ${safeDisplayName} (${session.sub}) - ${safeTitle}`);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  let response: Awaited<ReturnType<typeof fetch>>;
  try {
    response = await fetch(parsedWebhookUrl.toString(), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      redirect: "error",
      signal: controller.signal,
      body: JSON.stringify({
        embeds: [embed],
        allowed_mentions: { parse: [] },
      }),
    });
  } catch (error) {
    console.error(`[LT1] Webhook request failed: ${error instanceof Error ? error.message : "unknown error"}`);
    return sendJson(res, 502, { error: "Failed to deliver to Discord." });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    console.error(`[LT1] Failed to send webhook: ${response.status} ${response.statusText}`);
    return sendJson(res, 502, { error: "Failed to deliver to Discord." });
  }

  return sendJson(res, 200, { ok: true });
}
