import test from 'node:test';
import assert from 'node:assert/strict';
import { generateHtml } from '../../src/lib/png-to-table/generate-html.ts';

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

test('generateHtml returns a standalone document by default', () => {
  const html = generateHtml(image, baseOptions);

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<table role=presentation cellpadding=0 cellspacing=0 border=0/);
  assert.equal((html.match(/<tr>/g) ?? []).length, 2);
  assert.equal((html.match(/<td /g) ?? []).length, 4);
  assert.doesNotMatch(html, /<head>/i);
  assert.match(html, /<body style="margin:0;padding:0">/);
  assert.match(html, /<td width=10 height=10 bgcolor=#f00><\/td>/);
});

test('generateHtml returns fragment markup when fragment is enabled', () => {
  const html = generateHtml(image, { ...baseOptions, fragment: true });

  assert.doesNotMatch(html, /^<!doctype html>/i);
  assert.match(html, /^<table role=presentation/);
});

test('generateHtml emits rgba() colors for translucent pixels in preserve mode', () => {
  const html = generateHtml(image, { ...baseOptions, fragment: true });

  assert.match(html, /style="background:rgba\(255,255,0,.502\)"/);
});

test('generateHtml emits rgb() colors for translucent pixels in flatten mode', () => {
  const html = generateHtml(image, {
    ...baseOptions,
    transparency: 'flatten',
    fragment: true,
  });

  assert.match(html, /bgcolor=#ffff7f/);
});

test('generateHtml leaves fully transparent cells empty in preserve mode', () => {
  const transparentImage = {
    width: 1,
    height: 1,
    data: new Uint8Array([0, 0, 0, 0]),
  };
  const html = generateHtml(transparentImage, { ...baseOptions, fragment: true });

  assert.equal(
    html,
    '<table role=presentation cellpadding=0 cellspacing=0 border=0 style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0"><tr><td width=10 height=10></td></tr></table>'
  );
});
