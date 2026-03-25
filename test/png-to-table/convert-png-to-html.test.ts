import { PNG } from 'pngjs';
import { describe, expect, it } from 'vitest';
import { convertPngToHtml } from '@/lib/png-to-table';

function createPngBuffer(
  width: number,
  height: number,
  pixels: number[]
): Buffer {
  const png = new PNG({ width, height });
  png.data = Buffer.from(pixels);
  return PNG.sync.write(png);
}

describe('convertPngToHtml', () => {
  it('converts a 1x1 red PNG', async () => {
    const buffer = createPngBuffer(1, 1, [255, 0, 0, 255]);
    const result = await convertPngToHtml(buffer, { fragment: true });

    expect(result.width).toBe(1);
    expect(result.height).toBe(1);
    expect(result.totalCells).toBe(1);
    expect(result.html.match(/<tr>/g)?.length).toBe(1);
    expect(result.html.match(/<td /g)?.length).toBe(1);
    expect(result.html).toMatch(/bgcolor=#f00/);
  });

  it('converts a 2x2 mixed-color PNG', async () => {
    const buffer = createPngBuffer(2, 2, [
      255, 0, 0, 255,
      0, 255, 0, 255,
      0, 0, 255, 255,
      255, 255, 0, 255,
    ]);
    const result = await convertPngToHtml(buffer, { fragment: true });

    expect(result.width).toBe(2);
    expect(result.height).toBe(2);
    expect(result.totalCells).toBe(4);
    expect(result.html.match(/<tr>/g)?.length).toBe(2);
    expect(result.html.match(/<td /g)?.length).toBe(4);
    expect(result.html).toMatch(/bgcolor=#f00/);
    expect(result.html).toMatch(/bgcolor=#0f0/);
    expect(result.html).toMatch(/bgcolor=#00f/);
    expect(result.html).toMatch(/bgcolor=#ff0/);
  });

  it('preserves transparency for translucent PNG pixels', async () => {
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

    expect(result.html).toMatch(/background:rgba\(0,0,255,.251\)/);
    expect(result.html).toMatch(/background:rgba\(255,255,0,.502\)/);
  });

  it('rejects oversized images unless force is enabled', async () => {
    const buffer = createPngBuffer(2, 2, [
      255, 0, 0, 255,
      0, 255, 0, 255,
      0, 0, 255, 255,
      255, 255, 0, 255,
    ]);

    await expect(() =>
      convertPngToHtml(buffer, { fragment: true, maxCells: 3 })
    ).rejects.toThrow();
  });
});
