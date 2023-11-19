/**
 * Rounds a number to a specified number of decimal places.
 * @param value The number to be rounded.
 * @param decimalPlaces The number of decimal places to round to.
 * @return The rounded number.
 */
export function float(value: number, decimalPlaces: number): number {
  return (
    Math.round(value * Math.pow(10, decimalPlaces)) /
    Math.pow(10, decimalPlaces)
  );
}
