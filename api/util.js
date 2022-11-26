export function round(val, digits = 2) {
  return Math.round(val * 10 ** digits) / 10 ** digits
}
