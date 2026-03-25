import type { TransparencyMode } from './types.ts';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

export interface RgbaColor extends RgbColor {
  a: number;
}

export function parseHexColor(input: string): RgbColor {
  const normalized = input.trim();
  const match = /^#([0-9a-f]{6})$/i.exec(normalized);

  if (!match) {
    throw new Error('flattenBg must be a 6-digit hex color like #ffffff');
  }

  const value = match[1];
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

export function rgbToCss({ r, g, b }: RgbColor): string {
  return `rgb(${r}, ${g}, ${b})`;
}

export function rgbToHex({ r, g, b }: RgbColor): string {
  const hex = [r, g, b]
    .map((value) => value.toString(16).padStart(2, '0'))
    .join('');

  if (
    hex[0] === hex[1] &&
    hex[2] === hex[3] &&
    hex[4] === hex[5]
  ) {
    return `#${hex[0]}${hex[2]}${hex[4]}`;
  }

  return `#${hex}`;
}

export function rgbaToCss({ r, g, b, a }: RgbaColor): string {
  let alpha = (a / 255).toFixed(3).replace(/0+$/, '').replace(/\.$/, '');

  if (alpha.startsWith('0.')) {
    alpha = alpha.slice(1);
  }

  return `rgba(${r},${g},${b},${alpha})`;
}

export function flattenRgba(
  color: RgbaColor,
  background: RgbColor
): RgbColor {
  const alpha = color.a / 255;

  return {
    r: Math.round(color.r * alpha + background.r * (1 - alpha)),
    g: Math.round(color.g * alpha + background.g * (1 - alpha)),
    b: Math.round(color.b * alpha + background.b * (1 - alpha)),
  };
}

export function pixelToCssColor(
  color: RgbaColor,
  transparency: TransparencyMode,
  flattenBg: string
): string {
  if (transparency === 'flatten') {
    return rgbToCss(flattenRgba(color, parseHexColor(flattenBg)));
  }

  if (color.a === 255) {
    return rgbToCss(color);
  }

  return rgbaToCss(color);
}

export function pixelToMarkupBackground(
  color: RgbaColor,
  transparency: TransparencyMode,
  flattenBg: string
): { attribute: 'bgcolor' | 'style'; value: string } | null {
  if (transparency === 'flatten') {
    return {
      attribute: 'bgcolor',
      value: rgbToHex(flattenRgba(color, parseHexColor(flattenBg))),
    };
  }

  if (color.a === 0) {
    return null;
  }

  if (color.a === 255) {
    return {
      attribute: 'bgcolor',
      value: rgbToHex(color),
    };
  }

  return {
    attribute: 'style',
    value: `background:${rgbaToCss(color)}`,
  };
}
