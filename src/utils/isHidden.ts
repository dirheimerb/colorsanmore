import { ColorTypesMap } from "@flashmd/types";
/**
 * @function isHidden
 * @description Check if a field should be hidden
 * @param {boolean | (keyof ColorTypesMap)[]} hideInput
 * @param {keyof ColorTypesMap} field
 * @returns {boolean}
 * @example
 * import { isHidden } from "@flashmd/colorpicker";
 *
 * const hideInput = ["hsv", "hsl"];
 */
export function isHidden(
  hideInput: (keyof ColorTypesMap)[] | boolean,
  field: keyof ColorTypesMap,
) {
  return Array.isArray(hideInput)
    ? hideInput.includes(field)
    : hideInput;
}
