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
  assert.match(html, /<table class="png-table"/);
  assert.equal((html.match(/<tr>/g) ?? []).length, 2);
  assert.equal((html.match(/<td /g) ?? []).length, 4);
  assert.match(html, /width:10px;height:10px/);
});

test('generateHtml returns fragment markup when fragment is enabled', () => {
  const html = generateHtml(image, { ...baseOptions, fragment: true });

  assert.doesNotMatch(html, /^<!doctype html>/i);
  assert.match(html, /^<table class="png-table"/);
});

test('generateHtml emits rgba() colors for translucent pixels in preserve mode', () => {
  const html = generateHtml(image, { ...baseOptions, fragment: true });

  assert.match(html, /background:rgba\(255, 255, 0, 0.502\)/);
});

test('generateHtml emits rgb() colors for translucent pixels in flatten mode', () => {
  const html = generateHtml(image, {
    ...baseOptions,
    transparency: 'flatten',
    fragment: true,
  });

  assert.match(html, /background:rgb\(255, 255, 127\)/);
});
