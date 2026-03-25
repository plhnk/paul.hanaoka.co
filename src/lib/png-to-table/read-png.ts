import { PNG } from 'pngjs';
import type { DecodedPngImage } from './types.ts';

export function readPng(buffer: Buffer): Promise<DecodedPngImage> {
  return new Promise((resolve, reject) => {
    const png = new PNG();

    png.parse(buffer, (error, data) => {
      if (error || !data) {
        reject(new Error('Unable to decode PNG file'));
        return;
      }

      resolve({
        width: data.width,
        height: data.height,
        data: data.data,
      });
    });
  });
}
