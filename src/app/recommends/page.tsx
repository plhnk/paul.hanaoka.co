'use client';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import RecommendsComponent from '../../components/recommends';

// const Recommends: React.FC = () => {
export default function Recommends() {
  return (
    <div className="main-content">
      <MDXProvider>
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider>
      <RecommendsComponent className='' />
    </div>
  );
}
