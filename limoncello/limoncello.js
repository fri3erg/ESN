// Need more limoncello: the small rules shared by the page and the Telegram function.

export const MAX_NAME = 30;
export const COOLDOWN_MS = 20000; // rest after each request, so one happy thumb doesn't flood the chat

// Trimmed, one space between words, no control characters, at most MAX_NAME characters. '' = not a name.
export function cleanName(v) {
  if (typeof v !== 'string') return '';
  return [...v.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim()].slice(0, MAX_NAME).join('').trim();
}

// Milliseconds before the button works again (0 = now).
export function waitLeft(lastAt, now) {
  if (!lastAt || now < lastAt) return 0;
  return Math.max(0, lastAt + COOLDOWN_MS - now);
}

export function ordinal(n) {
  const t = n % 100;
  if (t >= 11 && t <= 13) return `${n}th`;
  return `${n}${{ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th'}`;
}

// The Telegram text: the name, how many times tonight (from the 2nd on) and the time.
export const message = (name, n, time) =>
  `🍋 ${name} needs more limoncello!${n > 1 ? ` (${ordinal(n)} time tonight)` : ''}${time ? ` · ${time}` : ''}`;
