const URL_PATTERN = /(?:https?:\/\/|www\.)[^\s]+/i;
const DOMAIN_PATTERN = /\b[a-z0-9-]+(?:\.[a-z0-9-]+)*\.[a-z]{2,}(?:\/[^\s]*)?/i;
const AT_SIGN_PATTERN = /@/;
const DISCORD_CHANNEL_REF_PATTERN = /<#\d{5,}>/;
const INVISIBLE_CHAR_PATTERN = /[\u00AD\u200B-\u200D\u2060\uFEFF]/g;
const DOT_VARIANT_PATTERN = /[\u3002\uFF0E\uFF61]/g;

function normalizeForValidation(value: string) {
  return value
    .normalize("NFKC")
    .replace(INVISIBLE_CHAR_PATTERN, "")
    .replace(DOT_VARIANT_PATTERN, ".");
}

export function findForbiddenReason(value: string) {
  if (!value) {
    return null;
  }
  const normalized = normalizeForValidation(value);
  if (!normalized) {
    return null;
  }
  if (AT_SIGN_PATTERN.test(normalized) || DISCORD_CHANNEL_REF_PATTERN.test(normalized)) {
    return "mention";
  }
  if (URL_PATTERN.test(normalized) || DOMAIN_PATTERN.test(normalized)) {
    return "url";
  }
  return null;
}
