export interface ClampProps {
  /**
   * @name value
   * @description The value to clamp
   * @type {number}
   */
  value: number;
  /**
   * @name min
   * @description The minimum value to clamp to
   * @type {number}
   */
  min: number;
  /**
   * @name max
   * @description The maximum value to clamp to
   * @type {number}
   */
  max: number;
}
/**
 * @name clamp
 * @description Clamp a value between a minimum and maximum value
 * @param {object} props
 * @param {number} props.value The value to clamp
 * @param {number} props.min The minimum value to clamp to
 * @param {number} props.max The maximum value to clamp to
 * @returns {number} The clamped value
 */
export function clamp(
  value: number,
  min: number,
  max: number,
): number {
  return value > max ? max : value < min ? min : value;
}

// function clamp(val, min, max) {
//   return Math.min(Math.max(val, min), max);
// }
