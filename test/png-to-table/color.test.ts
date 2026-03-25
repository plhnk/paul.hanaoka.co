import test from 'node:test';
import assert from 'node:assert/strict';
import {
  flattenRgba,
  parseHexColor,
  pixelToMarkupBackground,
  pixelToCssColor,
  rgbaToCss,
  rgbToCss,
  rgbToHex,
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

test('rgbToHex formats colors with shorthand when possible', () => {
  assert.equal(rgbToHex({ r: 255, g: 255, b: 255 }), '#fff');
  assert.equal(rgbToHex({ r: 18, g: 52, b: 86 }), '#123456');
});

test('rgbaToCss formats rgba colors with normalized alpha', () => {
  assert.equal(rgbaToCss({ r: 12, g: 34, b: 56, a: 128 }), 'rgba(12,34,56,.502)');
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
    'rgba(10,20,30,.502)'
  );
});

test('pixelToCssColor flattens translucent pixels as rgb()', () => {
  assert.equal(
    pixelToCssColor({ r: 255, g: 0, b: 0, a: 128 }, 'flatten', '#ffffff'),
    'rgb(255, 127, 127)'
  );
});

test('pixelToMarkupBackground omits fully transparent cells in preserve mode', () => {
  assert.equal(
    pixelToMarkupBackground({ r: 10, g: 20, b: 30, a: 0 }, 'preserve', '#ffffff'),
    null
  );
});

test('pixelToMarkupBackground uses compact bgcolor output for opaque cells', () => {
  assert.deepEqual(
    pixelToMarkupBackground({ r: 255, g: 255, b: 255, a: 255 }, 'preserve', '#ffffff'),
    { attribute: 'bgcolor', value: '#fff' }
  );
});
