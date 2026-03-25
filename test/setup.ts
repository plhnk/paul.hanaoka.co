import React from 'react';
import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

vi.mock('next/image', () => ({
  default: ({
    src,
    alt,
    fill: _fill,
    priority: _priority,
    loader: _loader,
    ...props
  }: {
    src: string | { src?: string };
    alt: string;
    fill?: boolean;
    priority?: boolean;
    loader?: unknown;
    [key: string]: unknown;
  }) =>
    React.createElement('img', {
      alt,
      src: typeof src === 'string' ? src : src?.src ?? '',
      ...props,
    }),
}));

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...props
  }: {
    href: string | { pathname?: string };
    children: React.ReactNode;
    [key: string]: unknown;
  }) =>
    React.createElement(
      'a',
      {
        href: typeof href === 'string' ? href : href?.pathname ?? '',
        ...props,
      },
      children
    ),
}));
