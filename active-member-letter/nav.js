// Pure navigation rules, kept apart from the page so they can be tested with node.

// The slide after moving by `dir` (+1 forward, -1 back), staying inside 0..count-1.
export function step(index, dir, count) {
  return Math.min(count - 1, Math.max(0, index + dir));
}

// What a finished touch means, from how far the finger moved (in px):
// +1 forward (a tap or a swipe to the left), -1 back (a swipe to the right), 0 nothing.
export const TAP_MAX = 12, SWIPE_MIN = 50;
export function gesture(dx, dy) {
  if (Math.hypot(dx, dy) <= TAP_MAX) return 1;
  if (Math.abs(dx) < SWIPE_MIN || Math.abs(dy) > Math.abs(dx)) return 0;
  return dx < 0 ? 1 : -1;
}

// The slide named in the address (#1 is the first), so a link can open on a given slide.
export function slideFromHash(hash, count) {
  const n = parseInt(String(hash).replace(/^#/, ""), 10);
  if (!Number.isFinite(n) || n < 1) return 0;
  return Math.min(count, n) - 1;
}
