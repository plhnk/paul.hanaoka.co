import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from './components/ui/hover-card';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including inline styles,
// components from other libraries, and more.

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    h1: ({ children }) => (
      <h1 className="text-base font-normal mb-24">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base font-normal mt-16 mb-0">{children}</h2>
    ),
    h3: ({ children }) => <h3 className="text-base mt-12">{children}</h3>,
    h4: ({ children }) => <h4 className="text-base mb-8">{children}</h4>,
    p: ({ children }) => <p className="">{children}</p>,
    ol: ({ children }) => <ol className="list-decimal *:!ps-0">{children}</ol>, 
    ul: ({ children }) => <ul className="list-disc *:!ps-0">{children}</ul>, 
    img: (props) => (
      <Image
        width={1200}
        height={800}
        className="rounded-lg shadow-menu"
        {...(props as ImageProps)}
      />
    ),
    hoverCard: ({ children, content }) => (
      <HoverCard>
        <HoverCardTrigger>{children}</HoverCardTrigger>
        <HoverCardContent>{content}</HoverCardContent>
      </HoverCard>
    ),
    ...components,
  };
}
