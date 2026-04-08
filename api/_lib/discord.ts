const DISCORD_WEBHOOK_ALLOWED_HOSTS = new Set([
  "discord.com",
  "canary.discord.com",
  "ptb.discord.com",
]);
const AT_SIGN_FAMILY_PATTERN = /[@\uFF20\uFE6B]/g;
const DISCORD_REFERENCE_OPEN_PATTERN = /<(?=[@#])/g;

export function validateDiscordWebhookUrl(raw: string) {
  const parsed = new URL(raw);
  if (parsed.protocol !== "https:" || !DISCORD_WEBHOOK_ALLOWED_HOSTS.has(parsed.hostname)) {
    throw new Error("Invalid webhook host/protocol");
  }
  return parsed;
}

export function sanitizeLog(value: string) {
  return Array.from(value)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return code >= 0x20 && code !== 0x7f;
    })
    .join("");
}

export function sanitizeDiscordText(value: string) {
  const normalized = sanitizeLog(value).normalize("NFKC");
  return normalized
    .replace(AT_SIGN_FAMILY_PATTERN, (char) => `${char}\u200B`)
    .replace(DISCORD_REFERENCE_OPEN_PATTERN, "<\u200B");
}
