import { pixelToMarkupBackground } from './color.ts';
import type {
  DecodedPngImage,
  NormalizedConvertPngToHtmlOptions,
} from './types.ts';

function buildTableMarkup(
  image: DecodedPngImage,
  options: NormalizedConvertPngToHtmlOptions
): string {
  const dimensionAttrs = ` width=${options.cellSize} height=${options.cellSize}`;
  const rows: string[] = [
    '<table role=presentation cellpadding=0 cellspacing=0 border=0 style="border-collapse:collapse;border-spacing:0;mso-table-lspace:0;mso-table-rspace:0">',
  ];

  for (let y = 0; y < image.height; y += 1) {
    const cells: string[] = ['<tr>'];

    for (let x = 0; x < image.width; x += 1) {
      const offset = (y * image.width + x) * 4;
      const background = pixelToMarkupBackground(
        {
          r: image.data[offset],
          g: image.data[offset + 1],
          b: image.data[offset + 2],
          a: image.data[offset + 3],
        },
        options.transparency,
        options.flattenBg
      );

      if (!background) {
        cells.push(`<td${dimensionAttrs}></td>`);
        continue;
      }

      if (background.attribute === 'bgcolor') {
        cells.push(
          `<td${dimensionAttrs} bgcolor=${background.value}></td>`
        );
        continue;
      }

      cells.push(
        `<td${dimensionAttrs} style="${background.value}"></td>`
      );
    }

    cells.push('</tr>');
    rows.push(cells.join(''));
  }

  rows.push('</table>');
  return rows.join('');
}

function buildStandaloneHtml(
  tableMarkup: string,
): string {
  return [
    '<!doctype html>',
    '<html><body style="margin:0;padding:0">',
    tableMarkup,
    '</body></html>',
  ].join('');
}

export function generateHtml(
  image: DecodedPngImage,
  options: NormalizedConvertPngToHtmlOptions
): string {
  const tableMarkup = buildTableMarkup(image, options);

  if (options.fragment) {
    return tableMarkup;
  }

  return buildStandaloneHtml(tableMarkup);
}
