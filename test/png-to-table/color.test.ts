import { describe, expect, it } from 'vitest';
import {
  flattenRgba,
  parseHexColor,
  pixelToMarkupBackground,
  pixelToCssColor,
  rgbaToCss,
  rgbToCss,
  rgbToHex,
} from '@/lib/png-to-table/color';

describe('png color helpers', () => {
  it('parses 6-digit hex colors', () => {
    expect(parseHexColor('#ff8800')).toEqual({ r: 255, g: 136, b: 0 });
  });

  it('rejects invalid hex values', () => {
    expect(() => parseHexColor('#fff')).toThrow();
  });

  it('formats rgb colors', () => {
    expect(rgbToCss({ r: 12, g: 34, b: 56 })).toBe('rgb(12, 34, 56)');
  });

  it('formats colors with shorthand hex when possible', () => {
    expect(rgbToHex({ r: 255, g: 255, b: 255 })).toBe('#fff');
    expect(rgbToHex({ r: 18, g: 52, b: 86 })).toBe('#123456');
  });

  it('formats rgba colors with normalized alpha', () => {
    expect(rgbaToCss({ r: 12, g: 34, b: 56, a: 128 })).toBe(
      'rgba(12,34,56,.502)'
    );
  });

  it('blends a pixel against the background color', () => {
    expect(
      flattenRgba({ r: 255, g: 0, b: 0, a: 128 }, { r: 255, g: 255, b: 255 })
    ).toEqual({ r: 255, g: 127, b: 127 });
  });

  it('preserves opaque pixels as rgb()', () => {
    expect(
      pixelToCssColor({ r: 10, g: 20, b: 30, a: 255 }, 'preserve', '#ffffff')
    ).toBe('rgb(10, 20, 30)');
  });

  it('preserves translucent pixels as rgba()', () => {
    expect(
      pixelToCssColor({ r: 10, g: 20, b: 30, a: 128 }, 'preserve', '#ffffff')
    ).toBe('rgba(10,20,30,.502)');
  });

  it('flattens translucent pixels as rgb()', () => {
    expect(
      pixelToCssColor({ r: 255, g: 0, b: 0, a: 128 }, 'flatten', '#ffffff')
    ).toBe('rgb(255, 127, 127)');
  });

  it('omits fully transparent cells in preserve mode', () => {
    expect(
      pixelToMarkupBackground(
        { r: 10, g: 20, b: 30, a: 0 },
        'preserve',
        '#ffffff'
      )
    ).toBeNull();
  });

  it('uses compact bgcolor output for opaque cells', () => {
    expect(
      pixelToMarkupBackground(
        { r: 255, g: 255, b: 255, a: 255 },
        'preserve',
        '#ffffff'
      )
    ).toEqual({ attribute: 'bgcolor', value: '#fff' });
  });
});
