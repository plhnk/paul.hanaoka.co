'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import UnsplashFeed from '../../components/unsplash-feed';
import Content from './content.mdx';

const Photos: React.FC = () => {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <UnsplashFeed className="col-span-3 sm:col-start-1 lg:col-start-2 2xl:col-start-3" />
    </>
  );
};

export default Photos;

// TODO --> unsplash photos
