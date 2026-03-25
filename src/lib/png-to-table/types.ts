export type TransparencyMode = 'preserve' | 'flatten';

export interface ConvertPngToHtmlOptions {
  cellSize?: number;
  transparency?: TransparencyMode;
  flattenBg?: string;
  maxCells?: number;
  force?: boolean;
  fragment?: boolean;
}

export interface NormalizedConvertPngToHtmlOptions {
  cellSize: number;
  transparency: TransparencyMode;
  flattenBg: string;
  maxCells: number;
  force: boolean;
  fragment: boolean;
}

export interface DecodedPngImage {
  width: number;
  height: number;
  data: Uint8Array;
}

export interface ConversionWarning {
  message: string;
}

export interface ConvertPngToHtmlResult {
  html: string;
  width: number;
  height: number;
  totalCells: number;
  warning?: ConversionWarning;
}
