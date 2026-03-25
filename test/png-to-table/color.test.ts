import test from 'node:test';
import assert from 'node:assert/strict';
import {
  flattenRgba,
  parseHexColor,
  pixelToCssColor,
  rgbaToCss,
  rgbToCss,
} from '../../src/lib/png-to-table/color.ts';

test('parseHexColor parses 6-digit hex colors', () => {
  assert.deepEqual(parseHexColor('#ff8800'), { r: 255, g: 136, b: 0 });
});

test('parseHexColor rejects invalid values', () => {
  assert.throws(() => parseHexColor('#fff'));
});

test('rgbToCss formats rgb colors', () => {
  assert.equal(rgbToCss({ r: 12, g: 34, b: 56 }), 'rgb(12, 34, 56)');
});

test('rgbaToCss formats rgba colors with normalized alpha', () => {
  assert.equal(rgbaToCss({ r: 12, g: 34, b: 56, a: 128 }), 'rgba(12, 34, 56, 0.502)');
});

test('flattenRgba blends a pixel against the background color', () => {
  assert.deepEqual(
    flattenRgba({ r: 255, g: 0, b: 0, a: 128 }, { r: 255, g: 255, b: 255 }),
    { r: 255, g: 127, b: 127 }
  );
});

test('pixelToCssColor preserves opaque pixels as rgb()', () => {
  assert.equal(
    pixelToCssColor({ r: 10, g: 20, b: 30, a: 255 }, 'preserve', '#ffffff'),
    'rgb(10, 20, 30)'
  );
});

test('pixelToCssColor preserves translucent pixels as rgba()', () => {
  assert.equal(
    pixelToCssColor({ r: 10, g: 20, b: 30, a: 128 }, 'preserve', '#ffffff'),
    'rgba(10, 20, 30, 0.502)'
  );
});

test('pixelToCssColor flattens translucent pixels as rgb()', () => {
  assert.equal(
    pixelToCssColor({ r: 255, g: 0, b: 0, a: 128 }, 'flatten', '#ffffff'),
    'rgb(255, 127, 127)'
  );
});
