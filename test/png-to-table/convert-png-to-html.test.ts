import test from 'node:test';
import assert from 'node:assert/strict';
import { PNG } from 'pngjs';
import { convertPngToHtml } from '../../src/lib/png-to-table/index.ts';

function createPngBuffer(
  width: number,
  height: number,
  pixels: number[]
): Buffer {
  const png = new PNG({ width, height });
  png.data = Buffer.from(pixels);
  return PNG.sync.write(png);
}

test('convertPngToHtml converts a 1x1 red PNG', async () => {
  const buffer = createPngBuffer(1, 1, [255, 0, 0, 255]);
  const result = await convertPngToHtml(buffer, { fragment: true });

  assert.equal(result.width, 1);
  assert.equal(result.height, 1);
  assert.equal(result.totalCells, 1);
  assert.equal((result.html.match(/<tr>/g) ?? []).length, 1);
  assert.equal((result.html.match(/<td /g) ?? []).length, 1);
  assert.match(result.html, /bgcolor=#f00/);
});

test('convertPngToHtml converts a 2x2 mixed-color PNG', async () => {
  const buffer = createPngBuffer(2, 2, [
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    255, 255, 0, 255,
  ]);
  const result = await convertPngToHtml(buffer, { fragment: true });

  assert.equal(result.width, 2);
  assert.equal(result.height, 2);
  assert.equal(result.totalCells, 4);
  assert.equal((result.html.match(/<tr>/g) ?? []).length, 2);
  assert.equal((result.html.match(/<td /g) ?? []).length, 4);
  assert.match(result.html, /bgcolor=#f00/);
  assert.match(result.html, /bgcolor=#0f0/);
  assert.match(result.html, /bgcolor=#00f/);
  assert.match(result.html, /bgcolor=#ff0/);
});

test('convertPngToHtml preserves transparency for translucent PNG pixels', async () => {
  const buffer = createPngBuffer(2, 2, [
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 64,
    255, 255, 0, 128,
  ]);
  const result = await convertPngToHtml(buffer, {
    fragment: true,
    transparency: 'preserve',
  });

  assert.match(result.html, /background:rgba\(0,0,255,.251\)/);
  assert.match(result.html, /background:rgba\(255,255,0,.502\)/);
});

test('convertPngToHtml rejects oversized images unless force is enabled', async () => {
  const buffer = createPngBuffer(2, 2, [
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    255, 255, 0, 255,
  ]);

  await assert.rejects(() =>
    convertPngToHtml(buffer, { fragment: true, maxCells: 3 })
  );
});
