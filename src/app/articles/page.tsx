'use client';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';

const Photos: React.FC = () => {
  return (
    <>
      <MDXProvider>
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider>
    </>
  );
};

export default Photos;

// TODO --> unsplash photos