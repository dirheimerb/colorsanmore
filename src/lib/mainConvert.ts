import { HEX, HSV, RGB } from "@flashmd/types";
function toHex(value: string): string {
  if (!value.startsWith("#")) {
    const ctx = document.createElement("canvas").getContext("2d");

    if (!ctx) {
      throw new Error(
        "2d context not supported or canvas already initialized",
      );
    }

    ctx.fillStyle = value;

    return ctx.fillStyle;
  } else if (value.length === 4 || value.length === 5) {
    value = value
      .split("")
      .map((v, i) => (i ? v + v : "#"))
      .join("");

    return value;
  } else if (value.length === 7 || value.length === 9) {
    return value;
  }

  return "#000000";
}

function hex2rgb(hex: string): RGB {
  const rbgArr = (
    hex
      .replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b,
      )
      .substring(1)
      .match(/.{2}/g) || []
  ).map((x) => parseInt(x, 16));

  return {
    b: rbgArr[2],
    g: rbgArr[1],
    r: rbgArr[0],
  };
}

function rgb2hsv({ r, g, b }: RGB): HSV {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const d = max - Math.min(r, g, b);

  const h = d
    ? (max === r
        ? (g - b) / d + (g < b ? 6 : 0)
        : max === g
          ? 2 + (b - r) / d
          : 4 + (r - g) / d) * 60
    : 0;
  const s = max ? (d / max) * 100 : 0;
  const v = max * 100;

  return { h, s, v };
}

function hsv2rgb({ h, s, v }: HSV): RGB {
  s /= 100;
  v /= 100;

  const i = ~~(h / 60);
  const f = h / 60 - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  const index = i % 6;

  const r = Math.round([v, q, p, p, t, v][index] * 255);
  const g = Math.round([t, v, v, q, p, p][index] * 255);
  const b = Math.round([p, p, t, v, v, q][index] * 255);

  return {
    r,
    g,
    b,
  } as RGB;
}

function rgb2hex({ b, g, r }: RGB): string {
  return (
    "#" +
    [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")
  );
}
type ColorKeyMaps = {
  hex: HEX;
  rgb: RGB;
  hsv: HSV;
};

function transformColor<
  M extends keyof ColorKeyMaps,
  C extends ColorKeyMaps[M],
>(format: M, color: C): ColorKeyMaps {
  let hex: ColorKeyMaps["hex"] = toHex("#121212");
  let rgb: ColorKeyMaps["rgb"] = hex2rgb(hex);
  let hsv: ColorKeyMaps["hsv"] = rgb2hsv(rgb);

  if (format === "hex") {
    const value = color as ColorKeyMaps["hex"];

    hex = toHex(value);
    rgb = hex2rgb(hex);
    hsv = rgb2hsv(rgb);
  } else if (format === "rgb") {
    const value = color as ColorKeyMaps["rgb"];

    rgb = value;
    hex = rgb2hex(rgb);
    hsv = rgb2hsv(rgb);
  } else if (format === "hsv") {
    const value = color as ColorKeyMaps["hsv"];

    hsv = value;
    rgb = hsv2rgb(hsv);
    hex = rgb2hex(rgb);
  }

  return { hex, hsv, rgb };
}
/**
 * @name PrimaryConvert
 * @description Convert a color to a different format
 * @param {string} format The format to convert to
 * @param {string} color The color to convert
 * @returns {object} The converted color
 * @example
 * import { PrimaryConvert } from "@flash/colorpicker";
 *
 * const { hex, rgb, hsv } = PrimaryConvert.transform("hex", "#121212");
 *
 * console.log(hex); // #121212
 *
 * console.log(rgb); // { r: 18, g: 18, b: 18 }
 *
 * console.log(hsv); // { h: 0, s: 0, v: 7.0588235294117645 }
 *
 */

type PrimaryConvertOptions = "hex" | "rgb" | "hsv";
export function PrimaryConvert<T extends PrimaryConvertOptions>(
  format: T,
  color: ColorKeyMaps[T],
): ColorKeyMaps {
  return transformColor(format, color);
}
export const PrimaryTransform = (
  color: string,
  option: PrimaryConvertOptions,
): ColorKeyMaps => {
  const options = {
    transform: transformColor,
    hex: toHex,
    rgb: hex2rgb,
    hsv: rgb2hsv,
  };
  return options.transform(option, color);
};
