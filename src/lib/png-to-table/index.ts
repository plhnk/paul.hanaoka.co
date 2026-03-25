import { generateHtml } from './generate-html.ts';
import { readPng } from './read-png.ts';
import type {
  ConvertPngToHtmlOptions,
  ConvertPngToHtmlResult,
} from './types.ts';
import { normalizeOptions, validateImageSize } from './validate.ts';

export async function convertPngToHtml(
  buffer: Buffer,
  options: ConvertPngToHtmlOptions = {}
): Promise<ConvertPngToHtmlResult> {
  const normalizedOptions = normalizeOptions(options);
  const image = await readPng(buffer);
  const { totalCells, warning } = validateImageSize(
    image.width,
    image.height,
    normalizedOptions
  );

  return {
    html: generateHtml(image, normalizedOptions),
    width: image.width,
    height: image.height,
    totalCells,
    warning,
  };
}

export type {
  ConvertPngToHtmlOptions,
  ConvertPngToHtmlResult,
  NormalizedConvertPngToHtmlOptions,
  TransparencyMode,
} from './types.ts';
