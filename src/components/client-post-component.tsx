'use client'

import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { useEffect } from 'react';

export default function ClientPostContent({ content }: { content: MDXRemoteSerializeResult }) {
  useEffect(() => {
    console.log('PostContent mounted or updated');
    return () => {
      console.log('PostContent unmounted');
    };
  }, [content]);

  return <MDXRemote {...content} />;
}