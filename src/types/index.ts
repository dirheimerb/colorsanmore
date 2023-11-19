export interface RGB {
  /**
   * @name r
   * @description The red value
   * @type {number}
   */
  r: number;
  /**
   * @name g
   * @description The green value
   * @type {number}
   */
  g: number;
  /**
   * @name b
   * @description The blue value
   * @type {number}
   */
  b: number;
}

export interface RGBA extends RGB {
  /**
   * @extends RGB
   * @name a
   * @description The alpha value
   * @type {number}
   */
  a: number;
}

export interface CMYK {
  /**
   * @name c
   * @description The cyan value
   * @type {number}
   * @default 0
   */
  c: number;
  /**
   * @name m
   * @description The magenta value
   * @type {number}
   * @default 0
   */
  m: number;
  /**
   * @name y
   * @description The yellow value
   * @type {number}
   * @default 0
   */
  y: number;
  /**
   * @name k
   * @description The key value
   * @type {number}
   * @default 0
   */
  k: number;
}
export interface HWB {
  /**
   * @name h
   * @description The hue value
   * @type {number}
   * @default 0
   */
  h: number;
  /**
   * @name w
   * @description The white value
   * @type {number}
   * @default 0
   */
  w: number;
  /**
   * @name b
   * @description The black value
   * @type {number}
   * @default 0
   */
  b: number;
}
export interface HSL {
  /**
   * @name h
   * @description The hue value
   * @type {number}
   * @default 0
   */
  h: number;
  /**
   * @name s
   * @description The saturation value
   * @type {number}
   * @default 0
   */
  s: number;
  /**
   * @name l
   * @description The lightness value
   * @type {number}
   * @default 0
   */
  l: number;
}

export interface HSLA extends HSL {
  /**
   * @extends HSL
   * @name a
   * @description The alpha value
   * @type {number}
   * @default 1
   */
  a: number;
}

export interface HWB {
  /**
   * @name h
   * @description The hue value
   * @type {number}
   * @default 0
   */
  h: number;
  /**
   * @name w
   * @description The white value
   * @type {number}
   * @default 0
   */
  w: number;
  /**
   * @name b
   * @description The black value
   * @type {number}
   * @default 0
   */
  b: number;
}

export interface HSV {
  /**
   * @name h
   * @description The hue value
   * @type {number}
   * @default 0
   */
  h: number;
  /**
   * @name s
   * @description The saturation value
   * @type {number}
   * @default 0
   */
  s: number;
  /**
   * @name v
   * @description The value value
   * @type {number}
   * @default 0
   */
  v: number;
}

export interface HSVA extends HSV {
  /**
   * @extends HSV
   * @name a
   * @description The alpha value
   * @type {number}
   * @default 1
   */
  a: number;
}

export interface LAB {
  /**
   * @name l
   * @description The lightness value
   * @type {number}
   * @default 0
   */
  l: number;
  /**
   * @name a
   * @description The a value
   * @type {number}
   * @default 0
   */
  a: number;
  /**
   * @name b
   * @description The b value
   * @type {number}
   * @default 0
   */
  b: number;
}

export interface LCH {
  /**
   * @name l
   * @description The lightness value
   * @type {number}
   * @default 0
   */
  l: number;
  /**
   * @name c
   * @description The c value
   * @type {number}
   * @default 0
   */
  c: number;
  /**
   * @name h
   * @description The h value
   * @type {number}
   * @default 0
   */
  h: number;
}

export interface XYZ {
  /**
   * @name x
   * @description The x value
   * @type {number}
   * @default 0
   */
  x: number;
  /**
   * @name y
   * @description The y value
   * @type {number}
   * @default 0
   */
  y: number;
  /**
   * @name z
   * @description The z value
   * @type {number}
   * @default 0
   */
  z: number;
}
/**
 * @name hex
 * @description The hex value
 * @type {string}
 * @default #000000
 */
export type HEX = string;
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
 * @property {HEX} hex
 */
export type Color =
  | RGB
  | RGBA
  | CMYK
  | HSL
  | HSLA
  | HSV
  | LAB
  | LCH
  | XYZ
  | HEX;

export type ColorKeys<T extends ColorTypesMap = ColorTypesMap> =
  keyof T;

export type ColorTypes = keyof ColorTypesMap;

export interface ColorTypesMap {
  rgb: RGB;
  rgba: RGBA;
  cmyk: CMYK;
  hsl: HSL;
  hsla: HSLA;
  hsv: HSV;
  hsva: HSVA;
  lab: LAB;
  lch: LCH;
  xyz: XYZ;
  hex: HEX;
  hwb: HWB;
}
