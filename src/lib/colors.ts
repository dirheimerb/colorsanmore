import {
  HEX,
  HSL,
  HSLA,
  HSV,
  HWB,
  RGB,
  RGBA,
  LAB,
  LCH,
  CMYK,
  XYZ,
  ColorTypesMap,
} from "@flashmd/types";
import colorList from "./colors.json";

/**
 * @class Colors
 * @classdesc A class for converting colors between different color models
 * @example
 * const colors = new Colors();
 * colors.convert('hex', '#000000'); // => { r: 0, g: 0, b: 0 }
 * colors.convert('rgb', { r: 0, g: 0, b: 0 }); // => '#000000'
 */
export default class Colors {
  constructor() {}
  convert<M extends keyof ColorTypesMap, C extends ColorTypesMap[M]>(
    model: M,
    color: C,
  ): ColorTypesMap {
    let rgb: RGB;
    let alpha: number = 1;

    switch (model) {
      case "hex":
        const hex = color as HEX;
        rgb = this.hex2rgb(hex);
        break;
      case "rgb":
        rgb = color as RGB;
        break;
      case "rgba":
        const rgba = color as RGBA;
        rgb = { r: rgba.r, g: rgba.g, b: rgba.b }; // Extract RGB components
        alpha = rgba.a; // Preserve alpha
        break;
      case "hsv":
        const hsv = color as HSV;
        rgb = this.hsv2rgb(hsv);
        break;
      case "hsl":
        const hsl = color as HSL;
        rgb = this.hsl2rgb(hsl.h, hsl.s, hsl.l);
        break;
      case "hwb":
        const hwb = color as HWB;
        rgb = this.hwb2rgb(hwb);
        break;
      case "cmyk":
        const cmyk = color as CMYK;
        rgb = this.cmyk2rgb(cmyk);
        break;
      case "lab":
        const lab = color as LAB;
        rgb = this.lab2rgb(lab);
        break;
      case "lch":
        const lch = color as LCH;
        rgb = this.lch2rgb(lch);
        break;
      case "xyz":
        const xyz = color as XYZ;
        rgb = this.xyz2rgb(xyz);
        break;
      case "hsla":
        const hsla = color as HSLA;
        rgb = this.hsl2rgb(hsla.h, hsla.s, hsla.l);
        alpha = hsla.a;
        break;
      default:
        throw new Error(`Unsupported color model: ${model}`);
    }
    /**
     * @name Color
     * @description A color object
     * @type {object}
     * @property {RGB} rgb
     * @property {RGBA} rgba
     * @property {CMYK} cmyk
     * @property {HSL} hsl
     * @property {HSLA} hsla
     * @property {HSV} hsv
     * @property {LAB} lab
     * @property {LCH} lch
     * @property {XYZ} xyz
     * @example
     * const color = new Color('#000000');
     * color.rgb; // => { r: 0, g: 0, b: 0 }
     * color.rgba; // => { r: 0, g: 0, b: 0, a: 1 }
     * color.cmyk; // => { c: 0, m: 0, y: 0, k: 100 }
     * color.hsl; // => { h: 0, s: 0, l: 0 }
     * color.hsla; // => { h: 0, s: 0, l: 0, a: 1 }
     * color.hsv; // => { h: 0, s: 0, v: 0 }
     * color.lab; // => { l: 0, a: 0, b: 0 }
     * color.lch; // => { l: 0, c: 0, h: 0 }
     * color.xyz; // => { x: 0, y: 0, z: 0 }
     * color.hex; // => '#000000'
     * color.alpha; // => 1
     * color.string; // => 'rgb(0, 0, 0)'
     * color.hslString; // => 'hsl(0, 0, 0)'
     * color.hwbString; // => 'hwb(0, 0, 0)'
     * color.cmykString; // => 'cmyk(0, 0, 0, 100)'
     * color.keyword; // => 'black'
     * color.luminance; // => 0
     * color.contrast('#ffffff'); // => 21
     * color.isDark; // => true
     */
    const rgba = { ...rgb, a: alpha };
    const hex = this.rgb2hex(rgba);
    const hsv = this.rgb2hsv(rgb);
    const hsl = this.rgb2hsl(rgb);
    const hwb = this.rgb2hwb(rgb);
    const cmyk = this.rgb2cmyk(rgb);
    const lab = this.rgb2lab(rgb);
    const lch = this.rgb2lch(rgb);
    const xyz = this.rgb2xyz(rgb);
    const hsva = { ...hsv, a: alpha }; // Combine HSV with alpha for HSVA
    const hsla = { ...hsl, a: alpha }; // Combine HSL with alpha for HSLA

    return {
      hex,
      rgb,
      rgba,
      hsv,
      hsva,
      hsl,
      hwb,
      cmyk,
      lab,
      hsla,
      lch,
      xyz,
    };
  }
  /**
   * @method toRGB
   * @description Converts a color to an RGB object
   * @param {string} value - Color to convert
   * @returns {RGB} - RGB object
   * @example
   * toRGB('#000000'); // => { r: 0, g: 0, b: 0 }
   */
  toRGB(value: string): RGB {
    const hex = this.toHex(value);
    const rgb = this.hex2rgb(hex);

    return rgb;
  }
  /**
   * @method toHSV
   * @description Converts a color to an HSV object
   * @param {string} value - Color to convert
   * @returns {HSV} - HSV object
   * @example
   * toHSV('#000000'); // => { h: 0, s: 0, v: 0 }
   */
  toHSV(value: string): HSV {
    const hex = this.toHex(value);
    const hsv = this.hex2hsv(hex);

    return hsv;
  }
  /**
   * @method toHSL
   * @description Converts a color to an HSL object
   * @param {HEX} hex - Color to convert
   * @returns {HSL} - HSL object
   * @example
   * toHSL('#000000'); // => { h: 0, s: 0, l: 0 }
   */
  hex2hsv(hex: HEX): HSV {
    const rgb = this.hex2rgb(hex);
    const hsv = this.rgb2hsv(rgb);

    return hsv;
  }

  /**
   * @method toRGBA
   * @description Converts a color to an RGBA object
   * @param {string} value - Color to convert
   * @returns {RGBA} - RGBA object
   * @example
   * toRGBA('#000000'); // => { r: 0, g: 0, b: 0, a: 1 }
   */
  toRGBA(value: string): RGBA {
    const hex = this.toHex(value);
    const rgba = this.hex2rgb(hex);

    return rgba;
  }

  /**
   * @method toHSL
   * @description Converts a color to an HSL object
   * @param {string} value - Color to convert
   * @returns {HSL} - HSL object
   * @example
   * toHSL('#000000'); // => { h: 0, s: 0, l: 0 }
   */
  toHSL(value: string): HSL {
    const hex = this.toHex(value);
    const hsl = this.hex2hsl(hex);

    return hsl;
  }
  /**
   * @method hex2rgba
   * @description Converts a hex string to an RGBA object
   * @param {string} value - Hex string to convert
   * @returns {RGBA} - RGBA object
   * @example
   * hex2rgba('#000000'); // => { r: 0, g: 0, b: 0, a: 1 }
   */
  hex2rgba(value: string): RGBA {
    const hex = this.toHex(value);
    const rgba = this.hex2rgb(hex);

    return rgba;
  }

  /**
   * @method toHex
   * @description Converts a color to a hex string
   * @param {string} value - Color to convert
   * @returns {string} - Hex string
   * @example
   * toHex('#000000'); // => '#000000'
   */
  toHex(value: string): string {
    if (!value.startsWith("#")) {
      const ctx = document.createElement("canvas").getContext("2d");
      ctx!.fillStyle = value;
      value = ctx!.fillStyle;
    }

    return value;
  }
  /**
   * @method cmyk2rgb
   * @description Converts a CMYK object to an RGB object
   * @param {CMYK} cmyk - CMYK object to convert
   * @returns {number[]} - RGB object
   * @example
   * cmyk2rgb({ c: 0, m: 0, y: 0, k: 100 }); // => [0, 0, 0]
   */
  cmyk2rgb(cmyk: CMYK): RGB {
    const c = cmyk.c / 100;
    const m = cmyk.m / 100;
    const y = cmyk.y / 100;
    const k = cmyk.k / 100;

    const r = 1 - Math.min(1, c * (1 - k) + k);
    const g = 1 - Math.min(1, m * (1 - k) + k);
    const b = 1 - Math.min(1, y * (1 - k) + k);

    return {
      r: r * 255,
      g: g * 255,
      b: b * 255,
    };
  }
  /**
   * @method hsl2hsv
   * @description Converts an HSL object to an HSV object
   * @param {HSL} hsl - HSL object to convert
   * @returns {HSV} - HSV object
   * @example
   * hsl2hsv({ h: 0, s: 0, l: 0 }); // => { h: 0, s: 0, v: 0 }
   */
  hsl2hsv(hsl: HSL): HSV {
    const h = hsl.h / 360;
    const s = hsl.s / 100;
    const l = hsl.l / 100;
    const sv = s * (l < 0.5 ? l : 1 - l);

    const v = l + sv;

    return {
      h: h, // Hue normalized to 0-1 range
      s: Math.round(v === 0 ? 0 : (200 * sv) / v),
      v: Math.round(100 * v),
    };
  }
  /**
   * @method hsl2rgb
   * @description Converts an HSL color value to RGB. Conversion formula
   * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
   * Assumes h, s, and l are contained in the set [0, 1] and
   * returns r, g, and b in the set [0, 255].
   * @param {HSL} hsl.h - The Hue color value
   * @param {HSL} hsl.s - The Saturation color value
   * @param {HSL} hsl.l - The Lightness color value
   * @returns {number[]} - The RGB representation
   * @example
   * hsl2rgb({ h: 0, s: 0, l: 0 }); // => [0, 0, 0]
   */
  hsl2rgb(h: number, s: number, l: number): RGB {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0;
    let g = 0;
    let b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }

    return {
      r: Math.round((r + m) * 255),
      g: Math.round((g + m) * 255),
      b: Math.round((b + m) * 255),
    };
  }
  /**
   * @method hsl2string
   * @description Converts an HSL or HSLA object to a string
   * @param {HSL | HSLA} hsl - HSL or HSLA object to convert
   * @returns {string} - HSL or HSLA string
   * @example
   * hsl2string({ h: 0, s: 0, l: 0 }); // => 'hsl(10%, 5%, 100%)'
   */
  hsl2string(hsl: HSL | HSLA): string {
    let scheme = "hsl";
    const hslValues = [
      Math.round(hsl.h) + "°",
      Math.round(hsl.s) + "%",
      Math.round(hsl.l) + "%",
    ];

    if ("a" in hsl) {
      scheme += "a";
      hslValues.push(hsl.a.toString()); // Add alpha value if present
    }

    return `${scheme}(${hslValues.join(", ")})`;
  }

  /**
   * @method hsv2hsl
   * @description Converts an HSV object to an HSL object
   * @param {HSV} hsv - HSV object to convert
   * @returns {HSL} - HSL object
   * @example
   * hsv2hsl({ h: 0, s: 0, v: 0 }); // => { h: 0, s: 0, l: 0 }
   */
  hsv2hsl(hsv: HSV): HSL {
    const h = hsv.h;
    const s = hsv.s / 100;
    const v = hsv.v / 100;
    let sl: number = 0;
    let l: number = 0;

    l = (2 - s) * v;
    sl = s * v;
    sl /= l <= 1 ? l : 2 - l;
    sl = sl || 0;
    l /= 2;
    const hsl = {
      h: h,
      s: sl * 100,
      l: l * 100,
    };
    return hsl;
  }
  /**
   * @method hsv2rgb
   * @description Converts an HSV object to an RGB array
   * @param {HSV} hsv - HSV object to convert
   * @returns {number[] | undefined} - RGB array
   * @example
   * hsv2rgb({ h: 0, s: 0, v: 0 }); // => [0, 0, 0]
   */
  hsv2rgb(hsv: HSV): RGB {
    const h = hsv.h / 60;
    const s = hsv.s / 100;
    let v = hsv.v / 100;

    const hi = Math.floor(h) % 6;

    const f = h - Math.floor(h);
    const p = 255 * v * (1 - s);
    const q = 255 * v * (1 - s * f);
    const t = 255 * v * (1 - s * (1 - f));
    v = 255 * v;

    switch (hi) {
      case 0:
        return {
          r: v,
          g: t,
          b: p,
        };
      case 1:
        return { r: q, g: v, b: p };
      case 2:
        return { r: p, g: v, b: t };
      case 3:
        return { r: p, g: q, b: v };
      case 4:
        return { r: t, g: p, b: v };
      case 5:
        return { r: v, g: p, b: q };

      default:
        return { r: 0, g: 0, b: 0 };
    }
  }

  /**
   * @method hwb2rgb
   * @description Converts an HWB object to an RGB object
   * @param {HWB} hwb - HWB object to convert
   * @returns {RGB} - RGB object
   */
  hwb2rgb(hwb: HWB): RGB {
    const h = hwb.h / 360;
    let wh = hwb.w / 100;
    let bl = hwb.b / 100;
    const ratio = wh + bl;
    // initialize rgb to 0 and declare variables
    let i = 0;
    let v = 0;
    let f = 0;
    let n = 0;
    let r = 0;
    let g = 0;
    let b = 0;

    // wh + bl cant be > 1
    if (ratio > 1) {
      wh /= ratio;
      bl /= ratio;
    }

    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;
    if ((i & 0x01) != 0) {
      f = 1 - f;
    }
    n = wh + f * (v - wh); // linear interpolation

    switch (i) {
      default:
      case 6:
      case 0:
        r = v;
        g = n;
        b = wh;
        break;
      case 1:
        r = n;
        g = v;
        b = wh;
        break;
      case 2:
        r = wh;
        g = v;
        b = n;
        break;
      case 3:
        r = wh;
        g = n;
        b = v;
        break;
      case 4:
        r = n;
        g = wh;
        b = v;
        break;
      case 5:
        r = v;
        g = wh;
        b = n;
        break;
    }

    return { r: r * 255, g: g * 255, b: b * 255 };
  }
  /**
   * @method lch2lab
   * @description Converts an LCH object to an LAB object
   * @param {LCH} lch - LCH object to convert
   * @returns {LAB} - LAB object
   */
  lch2lab(lch: LCH): LAB {
    const l = lch.l,
      c = lch.c,
      h = lch.h;
    let a = 0,
      b = 0,
      hr = 0;

    hr = (h / 360) * 2 * Math.PI;
    a = c * Math.cos(hr);
    b = c * Math.sin(hr);
    return { l, a, b };
  }

  /**
   * @method lab2lch
   * @description Converts an LAB object to an LCH object
   * @param {LAB} lab - LAB object to convert
   * @returns {LCH} - LCH object
   */
  lab2lch(lab: LAB): number[] {
    const l = lab.l,
      a = lab.a,
      b = lab.b;
    let hr = 0,
      h = 0,
      c = 0;

    hr = Math.atan2(b, a);
    h = (hr * 360) / 2 / Math.PI;
    if (h < 0) {
      h += 360;
    }
    c = Math.sqrt(a * a + b * b);
    return [l, c, h];
  }

  /**
   * @method lab2xyz
   * @description Converts an LAB object to an XYZ object
   * @param {LAB} lab - LAB object to convert
   * @returns {XYZ} - XYZ object
   */
  lab2xyz(lab: LAB): XYZ {
    const l = lab.l,
      a = lab.a,
      b = lab.b;
    let x: number = 0;
    let y: number = 0;
    let z: number = 0;
    let y2: number = 0;

    if (l <= 8) {
      y = (l * 100) / 903.3;
      y2 = 7.787 * (y / 100) + 16 / 116;
    } else {
      y = 100 * Math.pow((l + 16) / 116, 3);
      y2 = Math.pow(y / 100, 1 / 3);
    }

    x =
      x / 95.047 <= 0.008856
        ? (x = (95.047 * (a / 500 + y2 - 16 / 116)) / 7.787)
        : 95.047 * Math.pow(a / 500 + y2, 3);

    z =
      z / 108.883 <= 0.008859
        ? (z = (108.883 * (y2 - b / 200 - 16 / 116)) / 7.787)
        : 108.883 * Math.pow(y2 - b / 200, 3);

    return { x, y, z };
  }

  /**
   * @method rgb2cmyk
   * @description Converts an RGB object to a CMYK object
   * @param {RGB} rgb - RGB object to convert
   * @returns {CMYK} - CMYK object
   */
  rgb2cmyk(rgb: RGB): CMYK {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const k = Math.min(1 - r, 1 - g, 1 - b);
    const c = (1 - r - k) / (1 - k) || 0;
    const m = (1 - g - k) / (1 - k) || 0;
    const y = (1 - b - k) / (1 - k) || 0;
    const cmyk = {
      c: c * 100,
      m: m * 100,
      y: y * 100,
      k: k * 100,
    };

    return cmyk;
  }

  /**
   * @method rgb2grayscale
   * @description Converts an RGB object to grayscale
   * @param {RGB} rgb - RGB object to convert
   * @returns {number} - Grayscale value
   * @example
   * rgb2grayscale({ r: 0, g: 0, b: 0 }); // => 0
   */
  rgb2grayscale(rgb: RGB): number {
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }

  /**
   * @method rgb2hex
   * @description Convert an RGB object to a hex string
   * @param {RGBA} rgba
   * @param {number} rgb.r - Red value
   * @param {number} rgb.g - Green value
   * @param {number} rgb.b - Blue value
   * @param {number} rgb.a - Alpha value
   * @returns {string}
   */
  rgb2hex(rgba: RGBA): HEX {
    const hex =
      componentToHex(rgba.r) +
      componentToHex(rgba.g) +
      componentToHex(rgba.b);
    const alpha = rgba.a !== undefined ? componentToHex(rgba.a) : "";

    return "#" + hex + alpha;
  }
  /**
   * @method rgb2hsl
   * @description Converts an RGB object to an HSL object
   * @param {RGB} rgb - RGB object to convert
   * @returns {HSL} - HSL object
   */
  rgb2hsl(rgb: RGB): HSL {
    const r = rgb.r / 255,
      g = rgb.g / 255,
      b = rgb.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      delta = max - min;
    let h = 0,
      s = 0,
      l = 0;

    if (max == min) h = 0;
    else if (r == max) h = (g - b) / delta;
    else if (g == max) h = 2 + (b - r) / delta;
    else if (b == max) h = 4 + (r - g) / delta;

    h = Math.min(h * 60, 360);

    if (h < 0) h += 360;

    l = (min + max) / 2;

    if (max == min) s = 0;
    else if (l <= 0.5) s = delta / (max + min);
    else s = delta / (2 - max - min);

    const hsl = {
      h: h,
      s: s * 100,
      l: l * 100,
    };
    return hsl;
  }
  /**
   * @method rgb2hsv
   * @description Converts an RGB object to an HSV object
   * @param {RGB} rgb - RGB object to convert
   * @returns {HSV} - HSV object
   */
  rgb2hsv(rgb: RGB): HSV {
    const r: number = rgb.r;
    const g: number = rgb.g;
    const b: number = rgb.b;
    const min: number = Math.min(r, g, b);
    const max: number = Math.max(r, g, b);
    const delta = max - min;
    let h: number = 0;
    let s: number = 0;
    let v: number = 0;

    if (max === 0) s = 0;
    else s = ((delta / max) * 1000) / 10;

    if (max == min) h = 0;
    else if (r == max) h = (g - b) / delta;
    else if (g == max) h = 2 + (b - r) / delta;
    else if (b == max) h = 4 + (r - g) / delta;

    h = Math.min(h * 60, 360);

    if (h < 0) h += 360;

    v = ((max / 255) * 1000) / 10;

    return { h, s, v };
  }
  /**
   * @method rgb2hwb
   * @description Converts an RGB object to an HWB object
   * @param {RGB} rgb - RGB object to convert
   * @returns {number[]} - HWB object
   */
  rgb2hwb(rgb: RGB): HWB {
    const r = rgb.r;
    const g = rgb.g;
    const b = rgb.b;
    const h = this.rgb2hsl(rgb).h;
    const w = (1 / 255) * Math.min(r, Math.min(g, b));
    const bb = 1 - (1 / 255) * Math.max(r, Math.max(g, b));

    return { h: h, w: w * 100, b: bb * 100 };
  }
  /**
   * @method xyz2lab
   * @description Converts an XYZ object to an LAB object
   * @param {XYZ} xyz - XYZ object to convert
   * @returns {LAB} - LAB object
   */
  rgb2lab(rgb: RGB): LAB {
    const xyz = this.rgb2xyz(rgb);
    let x = xyz.x;
    let y = xyz.y;
    let z = xyz.z;
    let l = 0;
    let a = 0;
    let b = 0;
    let p = 0;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    l = 116 * y - 16;
    a = 500 * (x - y);
    b = 200 * (y - z);

    return { l, a, b };
  }

  /**
   * @method rgb2xyz
   * @description Converts an RGB object to an XYZ object
   * @param {RGB} rgb - RGB object to convert
   * @returns {XYZ} - XYZ object
   */
  rgb2xyz(rgb: RGB): XYZ {
    let r = rgb.r / 255;
    let g = rgb.g / 255;
    let b = rgb.b / 255;

    // assume sRGB
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    const xyz = {
      x: x * 100,
      y: y * 100,
      z: z * 100,
    };
    return xyz;
  }
  /**
   * @method rgb2string
   * @description Converts an RGB object to a string
   * @param {RGBA} rgb - RGB object to convert
   * @returns {string} - String representation of RGB object
   */
  rgb2string(rgb: RGBA): string {
    let scheme = "rgb";
    const rgbValues = [
      Math.round(rgb.r),
      Math.round(rgb.g),
      Math.round(rgb.b),
    ];

    if ("a" in rgb) {
      scheme += "a";
      rgbValues.push(rgb.a!); // Add alpha value if present
    }

    return `${scheme}(${rgbValues.join(",")})`;
  }

  /**
   * @method xyz2rgb
   * @description Converts an XYZ object to an RGB object
   * @param {XYZ} xyz - XYZ object to convert
   * @returns {number[]} - RGB object
   * @example
   * xyz2rgb({ x: 0, y: 0, z: 0 }); // => [0, 0, 0]
   */
  xyz2rgb(xyz: XYZ): RGB {
    const x = xyz.x / 100;
    const y = xyz.y / 100;
    const z = xyz.z / 100;

    let r: number;
    let g: number;
    let b: number;

    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.204 + z * 1.057;

    // assume sRGB
    r =
      r > 0.0031308
        ? 1.055 * Math.pow(r, 1.0 / 2.4) - 0.055
        : (r = r * 12.92);

    g =
      g > 0.0031308
        ? 1.055 * Math.pow(g, 1.0 / 2.4) - 0.055
        : (g = g * 12.92);

    b =
      b > 0.0031308
        ? 1.055 * Math.pow(b, 1.0 / 2.4) - 0.055
        : (b = b * 12.92);

    r = Math.min(Math.max(0, r), 1);
    g = Math.min(Math.max(0, g), 1);
    b = Math.min(Math.max(0, b), 1);

    return { r: r * 255, g: g * 255, b: b * 255 };
  }

  /**
   * @method xyz2lab
   * @description Converts an XYZ object to an LAB object
   * @param {XYZ} xyz - XYZ object to convert
   * @returns {LAB} - LAB object
   * @example
   * xyz2lab({ x: 0, y: 0, z: 0 }); // => [0, 0, 0]
   */
  xyz2lab(xyz: XYZ): number[] {
    let x = xyz.x;
    let y = xyz.y;
    let z = xyz.z;

    x /= 95.047;
    y /= 100;
    z /= 108.883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    const l = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return [l, a, b];
  }
  /**
   * @method xyz2rgb
   * @param {HEX} hex
   * @returns {RGB} - RGB object
   *
   * @example
   * hex2rgb('#000000'); // => { r: 0, g: 0, b: 0 }
   */
  hex2rgb(hex: string): RGBA {
    hex = hex.slice(1);

    let [r, g, b, a] = Array.from({ length: 4 }).map((_, i) =>
      parseInt(hex.slice(i * 2, i * 2 + 2), 16),
    );

    a = Number.isNaN(a) ? 1 : a / 255;

    return { r, g, b, a };
  }
  /**
   * @method lab2rgb
   * @description Converts an LAB object to an RGB object
   * @param {LAB} lab - LAB object to convert
   * @returns {RGB} - RGB object
   *
   * @example
   * lab2rgb({ l: 0, a: 0, b: 0 }); // => { r: 0, g: 0, b: 0 }
   */
  lab2rgb(lab: LAB): RGB {
    const xyz = this.lab2xyz(lab);
    const rgb = this.xyz2rgb(xyz);

    return rgb;
  }
  /**
   * @method lab2string
   * @description Converts an LAB or LCH object to a string
   * @param {LAB | LCH} lab - LAB or LCH object to convert
   * @returns {string} - String representation of LAB or LCH object
   */
  lab2string(lab: LAB | LCH): string {
    let scheme = "lab";
    const labValues = [Math.round(lab.l)];

    if ("c" in lab) {
      scheme += "a";
      labValues.push(lab.c); // Add alpha value if present
    }

    return `${scheme}(${labValues.join(",")})`;
  }
  /**
   * @method hex2hsl
   * @description Converts a hex string to an HSL object
   * @param {string} value - Hex string to convert
   * @returns {HSL} - HSL object
   * @example
   * hex2hsl('#000000'); // => { h: 0, s: 0, l: 0 }
   */
  hex2hsl(value: string): HSL {
    const hex = this.toHex(value);
    const rgb = this.hex2rgb(hex);
    const hsl = this.rgb2hsl(rgb);

    return hsl;
  }

  /**
   * @method lch2rgb
   * @description Converts an LCH object to an RGB object
   * @param {LCH} lch - LCH object to convert
   * @returns {RGB} - RGB object
   * @example
   * lch2rgb({ l: 0, c: 0, h: 0 }); // => { r: 0, g: 0, b: 0 }
   */
  lch2rgb(lch: LCH): RGB {
    const lab = this.lch2lab(lch);
    const rgb = this.lab2rgb(lab);

    return rgb;
  }

  /**
   * @method rgb2lch
   * @description Converts an RGB object to an LCH object
   * @param {RGB} rgb - RGB object to convert
   * @returns {LCH} - LCH object
   * @example
   * rgb2lch({ r: 0, g: 0, b: 0 }); // => { l: 0, c: 0, h: 0 }
   */
  rgb2lch(rgb: RGB): LCH {
    const lab = this.rgb2lab(rgb);
    const lch = this.lab2lch(lab);

    return {
      l: lch[0],
      c: lch[1],
      h: lch[2],
    };
  }
  getColorList() {
    return colorList;
  }

  findColorByHEX(hex: string): string {
    const keys = Object.keys(colorList);
    const values = Object.values(colorList);
    const index = values.indexOf(hex);
    return keys[index];
  }
  clamp({ value, min, max }: ClampProps): number {
    return clamp(value, min, max);
  }
}

export function componentToHex(c: number): string {
  const value = Math.round(clamp(c, 0, 255));
  const hex = value.toString(16);

  return hex.length == 1 ? "0" + hex : hex;
}

export function isColor(color: string): boolean {
  return colorList.hasOwnProperty(color);
}

export function createColor(): Colors {
  return new Colors();
}

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
function clamp(value: number, min: number, max: number): number {
  return value > max ? max : value < min ? min : value;
}
