import { isStrongSessionSecret, readSession } from "../_lib/session.js";
import { PayloadTooLargeError, readJson, sendJson } from "../_lib/http.js";
import { checkRateLimit } from "../_lib/rateLimit.js";
import { enforceCsrf, enforceJson } from "../_lib/requestGuard.js";
import { serializeCookie, parseCookies } from "../_lib/cookies.js";
import { lt2Presenters } from "../../shared/lt2Presenters.js";
import { VoteStoreUnavailableError, releaseVoteSlot, reserveVoteSlot } from "../_lib/voteStore.js";
import { enforceFeatureEnabled } from "../_lib/featureFlag.js";
import { getTrustedIp } from "../_lib/trustedIp.js";

type VotePayload = {
    presenterId: string;
    presenterName?: string;
};

const EVENT_ID = "lt2";
const VOTE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;
const sanitizeLog = (value: string) =>
    Array.from(value)
        .filter((char) => {
            const code = char.charCodeAt(0);
            return code >= 0x20 && code !== 0x7f;
        })
        .join("");
const presentersById = new Map(lt2Presenters.map((presenter) => [presenter.id, presenter]));

function isSecureVoteCookie() {
    if (process.env.NODE_ENV === "production") {
        return true;
    }
    const baseUrl = process.env.APP_BASE_URL ?? "";
    return baseUrl.startsWith("https://");
}

function getVoteCookieName() {
    return isSecureVoteCookie() ? "__Host-lt2_voted" : "lt2_voted";
}

function hasVotedCookie(rawCookieHeader?: string) {
    const cookies = parseCookies(rawCookieHeader);
    return Boolean(cookies["lt2_voted"] || cookies["__Host-lt2_voted"]);
}

function validateWebhookUrl(raw: string) {
    const parsed = new URL(raw);
    const allowedHosts = new Set(["discord.com", "canary.discord.com", "ptb.discord.com"]);
    if (parsed.protocol !== "https:" || !allowedHosts.has(parsed.hostname)) {
        throw new Error("Invalid webhook host/protocol");
    }
    return parsed;
}

export default async function handler(
    req: { method?: string; headers?: Record<string, string | undefined> } & AsyncIterable<Uint8Array>,
    res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void },
) {
    if (req.method !== "POST") {
        return sendJson(res, 405, { error: "Method not allowed." });
    }
    if (!enforceFeatureEnabled(res, "LT2_VOTE_ENABLED", false)) {
        return;
    }
    if (!enforceCsrf(req, res)) {
        return;
    }
    if (!enforceJson(req, res)) {
        return;
    }

    const sessionSecret = process.env.SESSION_SECRET;
    if (!sessionSecret || !isStrongSessionSecret(sessionSecret)) {
        return sendJson(res, 500, { error: "Server configuration error." });
    }

    const session = readSession(req, sessionSecret);
    if (!session) {
        return sendJson(res, 401, { error: "Sign in with Discord first." });
    }

    if (hasVotedCookie(req.headers?.cookie)) {
        return sendJson(res, 409, { error: "You have already voted." });
    }

    const userKey = `lt2:vote:${session.sub}`;
    const userLimit = checkRateLimit(userKey, { limit: 10, windowMs: 10 * 60 * 1000 });
    if (!userLimit.allowed) {
        return sendJson(res, 429, { error: "Rate limit exceeded." });
    }
    const trustedIp = getTrustedIp(req.headers);
    if (trustedIp) {
        const ipKey = `lt2:vote-ip:${trustedIp}`;
        const ipLimit = checkRateLimit(ipKey, { limit: 20, windowMs: 10 * 60 * 1000 });
        if (!ipLimit.allowed) {
            return sendJson(res, 429, { error: "Rate limit exceeded." });
        }
    } else {
        const globalKey = "lt2:vote-global";
        const globalLimit = checkRateLimit(globalKey, { limit: 120, windowMs: 10 * 60 * 1000 });
        if (!globalLimit.allowed) {
            return sendJson(res, 429, { error: "Rate limit exceeded." });
        }
    }

    let body: VotePayload;
    try {
        body = await readJson<VotePayload>(req, { maxBytes: 1024 });
    } catch (error) {
        if (error instanceof PayloadTooLargeError) {
            return sendJson(res, 413, { error: "Payload too large." });
        }
        return sendJson(res, 400, { error: "Invalid JSON." });
    }

    const presenterId = (body.presenterId ?? "").trim();
    if (!presenterId) {
        return sendJson(res, 400, { error: "Presenter information is missing." });
    }
    if (presenterId.length > 50) {
        return sendJson(res, 400, { error: "Invalid data format." });
    }
    const presenter = presentersById.get(presenterId);
    if (!presenter) {
        return sendJson(res, 400, { error: "Unknown presenter." });
    }
    if (presenter.status !== "active") {
        return sendJson(res, 400, { error: "Presenter is not available." });
    }

    let reserved = false;
    try {
        reserved = await reserveVoteSlot(EVENT_ID, session.sub);
    } catch (error) {
        if (error instanceof VoteStoreUnavailableError) {
            return sendJson(res, 503, { error: "Vote system is temporarily unavailable." });
        }
        return sendJson(res, 500, { error: "Failed to process vote." });
    }
    if (!reserved) {
        return sendJson(res, 409, { error: "You have already voted." });
    }

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
        await releaseVoteSlot(EVENT_ID, session.sub);
        return sendJson(res, 500, { error: "Webhook is not configured." });
    }
    let parsedWebhookUrl: URL;
    try {
        parsedWebhookUrl = validateWebhookUrl(webhookUrl);
    } catch {
        await releaseVoteSlot(EVENT_ID, session.sub);
        return sendJson(res, 500, { error: "Invalid webhook configuration." });
    }

    const displayName = session.globalName
        ? `${session.globalName} (${session.username})`
        : session.username;
    const safeDisplayName = sanitizeLog(displayName);
    const safePresenter = sanitizeLog(presenter.name);
    const safePresenterId = sanitizeLog(presenter.id);

    const embed = {
        title: "LT2 Vote",
        color: 0xF59E0B,
        fields: [
            { name: "Voted For", value: safePresenter },
            { name: "ID", value: safePresenterId },
            { name: "Voter", value: `${safeDisplayName}\nID: ${session.sub}` },
        ],
        timestamp: new Date().toISOString(),
    };

    console.log(`[LT2] Vote: ${safeDisplayName} -> ${safePresenter}`);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    let webhookSucceeded = false;
    try {
        const response = await fetch(parsedWebhookUrl.toString(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            redirect: "error",
            signal: controller.signal,
            body: JSON.stringify({
                embeds: [embed],
                allowed_mentions: { parse: [] },
            }),
        });
        if (!response.ok) {
            console.error(`[LT2] Vote webhook failed: ${response.status}`);
            return sendJson(res, 502, { error: "Failed to record vote." });
        }
        webhookSucceeded = true;
    } catch (err) {
        console.error(`[LT2] Vote webhook error: ${err}`);
        return sendJson(res, 502, { error: "Failed to record vote." });
    } finally {
        if (!webhookSucceeded) {
            await releaseVoteSlot(EVENT_ID, session.sub);
        }
        clearTimeout(timeout);
    }

    res.setHeader("Set-Cookie", serializeCookie(getVoteCookieName(), "true", {
        httpOnly: true,
        secure: isSecureVoteCookie(),
        sameSite: "Lax",
        path: "/",
        maxAge: VOTE_COOKIE_MAX_AGE_SECONDS,
    }));

    return sendJson(res, 200, { ok: true });
}
