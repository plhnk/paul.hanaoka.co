'use client';

import type {
  CSSProperties,
  HTMLAttributes,
  IframeHTMLAttributes,
} from 'react';
import { MDXRemote } from 'next-mdx-remote';
import MDXImage from '@/components/mdx-image';

function parseStyleProp(style?: unknown): CSSProperties | undefined {
  if (!style) {
    return undefined;
  }

  if (typeof style !== 'string') {
    return style as CSSProperties;
  }

  return style
    .split(';')
    .map((rule) => rule.trim())
    .filter(Boolean)
    .reduce((accumulator, rule) => {
      const [property, ...valueParts] = rule.split(':');

      if (!property || valueParts.length === 0) {
        return accumulator;
      }

      const camelCaseProperty = property
        .trim()
        .replace(/-([a-z])/g, (_, character: string) =>
          character.toUpperCase()
        ) as keyof CSSProperties;

      accumulator[camelCaseProperty] = valueParts.join(':').trim();
      return accumulator;
    }, {} as Record<string, string>) as CSSProperties;
}

const SanitizedDiv = ({
  style,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div {...props} style={parseStyleProp(style)} />
);

const SanitizedIframe = ({
  allowfullscreen,
  frameborder,
  style,
  ...props
}: IframeHTMLAttributes<HTMLIFrameElement> & {
  allowfullscreen?: boolean | string;
  frameborder?: number | string;
}) => (
  <iframe
    {...props}
    allowFullScreen={
      allowfullscreen === '' ||
      allowfullscreen === true ||
      allowfullscreen === 'true'
    }
    frameBorder={frameborder}
    style={parseStyleProp(style)}
  />
);

const components = {
  Image: MDXImage,
  div: SanitizedDiv,
  iframe: SanitizedIframe,
  img: MDXImage,
};

export default function ClientPostContent({ content }: { content: any }) {
  return <MDXRemote {...content} components={components} />;
}
