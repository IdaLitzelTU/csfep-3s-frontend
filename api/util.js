export function round(val) {
   // if greater than 1000 round to 0 else round 2
   const roundDecimal = val < 100 ? 2 : 0
  return Math.round(val * 10 ** roundDecimal) / 10 ** roundDecimal
}