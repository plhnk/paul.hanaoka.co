'use client';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import UnsplashFeed from '../../components/unsplash-feed';
import Content from './content.mdx';

const Photos: React.FC = () => {
  return (
    <>
      <MDXProvider>
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider>
      <UnsplashFeed className='col-span-8 sm:col-start-2 sm:-ml-8'/>
    </>
  );
};

export default Photos;

// TODO --> unsplash photos