import { pixelToCssColor } from './color.ts';
import type {
  DecodedPngImage,
  NormalizedConvertPngToHtmlOptions,
} from './types.ts';

function buildTableMarkup(
  image: DecodedPngImage,
  options: NormalizedConvertPngToHtmlOptions
): string {
  const rows: string[] = [
    '<table class="png-table" role="presentation" aria-label="PNG rendered as an HTML table">',
  ];

  for (let y = 0; y < image.height; y += 1) {
    const cells: string[] = ['<tr>'];

    for (let x = 0; x < image.width; x += 1) {
      const offset = (y * image.width + x) * 4;
      const backgroundColor = pixelToCssColor(
        {
          r: image.data[offset],
          g: image.data[offset + 1],
          b: image.data[offset + 2],
          a: image.data[offset + 3],
        },
        options.transparency,
        options.flattenBg
      );

      cells.push(`<td style="background:${backgroundColor}"></td>`);
    }

    cells.push('</tr>');
    rows.push(cells.join(''));
  }

  rows.push('</table>');
  return rows.join('');
}

function buildStandaloneHtml(
  tableMarkup: string,
  options: NormalizedConvertPngToHtmlOptions
): string {
  const css = [
    'html,body{margin:0;padding:0;}',
    'table.png-table{border-collapse:collapse;border-spacing:0;}',
    `table.png-table td{width:${options.cellSize}px;height:${options.cellSize}px;padding:0;margin:0;}`,
  ].join('');

  return [
    '<!doctype html>',
    '<html lang="en">',
    '<head>',
    '<meta charset="utf-8">',
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    '<title>PNG Table Render</title>',
    `<style>${css}</style>`,
    '</head>',
    '<body>',
    tableMarkup,
    '</body>',
    '</html>',
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

  return buildStandaloneHtml(tableMarkup, options);
}
