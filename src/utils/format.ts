import { float } from "@flashmd/utils/float";
import { RGBA, HSVA } from "@flashmd/types";

/**
 * Formats an RGBA object into a string representation.
 * @param r Red component (0-255).
 * @param g Green component (0-255).
 * @param b Blue component (0-255).
 * @param a Alpha component (0-1).
 * @return A string representation of the RGBA color.
 */
export function formatRgb({ r, g, b, a }: RGBA): string {
  const rgb: number[] = [Math.round(r), Math.round(g), Math.round(b)];
  const alpha = float(a, 3);

  if (alpha < 1) rgb.push(alpha);

  return rgb.join(", ");
}
/**
 * Formats an HSVA object into a string representation.
 * @param h Hue component (0-360 degrees).
 * @param s Saturation component (0-100%).
 * @param v Value component (0-100%).
 * @param a Alpha component (0-1).
 * @return A string representation of the HSVA color.
 */
export function formatHsv({ h, s, v, a }: HSVA): string {
  const hsv: string[] = [
    `${Math.round(h)}°`,
    `${Math.round(s)}%`,
    `${Math.round(v)}%`,
  ];
  const alpha = float(a, 3);

  if (alpha < 1) hsv.push(`${alpha}`);

  return hsv.join(", ");
}
