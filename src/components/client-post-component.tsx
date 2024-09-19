'use client';

import { MDXRemote } from 'next-mdx-remote'; // Static import
import MDXImage from '@/components/mdx-image';

// import dynamic from 'next/dynamic'

// const MDXRemote: any = dynamic(() => import('next-mdx-remote').then(mod => mod.MDXRemote), { ssr: false })

const components = {
  img: MDXImage,
};

export default function ClientPostContent({ content }: { content: any }) {
  return <MDXRemote {...content} components={components} />;
}
