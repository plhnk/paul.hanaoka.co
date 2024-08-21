'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Posts from '@/components/posts';

export default function PostsPage() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <Posts showAll className='md:col-start-1 lg:col-start-3 col-span-4' />
    </>
  );
}
