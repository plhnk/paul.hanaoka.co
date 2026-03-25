import { describe, expect, it } from 'vitest';
import { generateHtml } from '@/lib/png-to-table/generate-html';

const image = {
  width: 2,
  height: 2,
  data: new Uint8Array([
    255, 0, 0, 255,
    0, 255, 0, 255,
    0, 0, 255, 255,
    255, 255, 0, 128,
  ]),
};

const baseOptions = {
  cellSize: 10,
  transparency: 'preserve' as const,
  flattenBg: '#ffffff',
  maxCells: 50000,
  force: false,
  fragment: false,
};

describe('generateHtml', () => {
  it('returns a standalone document by default', () => {
    const html = generateHtml(image, baseOptions);

    expect(html).toMatch(/^<!doctype html>/i);
    expect(html).toMatch(
      /<table role=presentation cellpadding=0 cellspacing=0 border=0/
    );
    expect(html.match(/<tr>/g)?.length).toBe(2);
    expect(html.match(/<td /g)?.length).toBe(4);
    expect(html).not.toMatch(/<head>/i);
    expect(html).toMatch(/<body style="margin:0;padding:0">/);
    expect(html).toMatch(/<td width=10 height=10 bgcolor=#f00><\/td>/);
  });

  it('returns fragment markup when fragment is enabled', () => {
    const html = generateHtml(image, { ...baseOptions, fragment: true });

    expect(html).not.toMatch(/^<!doctype html>/i);
    expect(html).toMatch(/^<table role=presentation/);
  });

  it('emits rgba() colors for translucent pixels in preserve mode', () => {
    const html = generateHtml(image, { ...baseOptions, fragment: true });

    expect(html).toMatch(/style="background:rgba\(255,255,0,.502\)"/);
  });

  it('emits rgb() colors for translucent pixels in flatten mode', () => {
    const html = generateHtml(image, {
      ...baseOptions,
      transparency: 'flatten',
      fragment: true,
    });

    expect(html).toMatch(/bgcolor=#ffff7f/);
  });

  it('leaves fully transparent cells empty in preserve mode', () => {
    const transparentImage = {
      width: 1,
      height: 1,
      data: new Uint8Array([0, 0, 0, 0]),
    };
    const html = generateHtml(transparentImage, {
      ...baseOptions,
      fragment: true,
    });

    expect(html).toBe(
      '<table role=presentation cellpadding=0 cellspacing=0 border=0 style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0"><tr><td width=10 height=10></td></tr></table>'
    );
  });
});
