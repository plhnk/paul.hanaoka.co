import type {
  ConversionWarning,
  ConvertPngToHtmlOptions,
  NormalizedConvertPngToHtmlOptions,
} from './types.ts';
import { parseHexColor } from './color.ts';

const DEFAULT_CELL_SIZE = 10;
const DEFAULT_TRANSPARENCY = 'preserve';
const DEFAULT_FLATTEN_BG = '#ffffff';
const DEFAULT_MAX_CELLS = 50000;
const LARGE_IMAGE_WARNING_THRESHOLD = 0.8;

function normalizePositiveInteger(
  value: number | undefined,
  fallback: number,
  fieldName: string
): number {
  const resolved = value ?? fallback;

  if (!Number.isFinite(resolved) || !Number.isInteger(resolved) || resolved <= 0) {
    throw new Error(`${fieldName} must be a positive integer`);
  }

  return resolved;
}

export function normalizeOptions(
  options: ConvertPngToHtmlOptions = {}
): NormalizedConvertPngToHtmlOptions {
  const cellSize = normalizePositiveInteger(
    options.cellSize,
    DEFAULT_CELL_SIZE,
    'cellSize'
  );
  const maxCells = normalizePositiveInteger(
    options.maxCells,
    DEFAULT_MAX_CELLS,
    'maxCells'
  );
  const transparency = options.transparency ?? DEFAULT_TRANSPARENCY;

  if (transparency !== 'preserve' && transparency !== 'flatten') {
    throw new Error('transparency must be either preserve or flatten');
  }

  const flattenBg = (options.flattenBg ?? DEFAULT_FLATTEN_BG).trim().toLowerCase();
  parseHexColor(flattenBg);

  return {
    cellSize,
    transparency,
    flattenBg,
    maxCells,
    force: Boolean(options.force),
    fragment: Boolean(options.fragment),
  };
}

export function validateImageSize(
  width: number,
  height: number,
  options: NormalizedConvertPngToHtmlOptions
): { totalCells: number; warning?: ConversionWarning } {
  const totalCells = width * height;

  if (totalCells > options.maxCells && !options.force) {
    throw new Error(
      `Image is too large: ${totalCells} cells exceeds maxCells ${options.maxCells}. Use force to continue.`
    );
  }

  if (totalCells >= options.maxCells * LARGE_IMAGE_WARNING_THRESHOLD) {
    return {
      totalCells,
      warning: {
        message: `Large image: ${width}x${height} will generate ${totalCells} table cells.`,
      },
    };
  }

  return { totalCells };
}
