'use client';
import React from 'react';
import MdxLayout from '../../../components/mdx-layout';
import Content from './content.mdx';

export default function Projects() {
  return (
    <div className="col-start-3 col-span-7">
        <MdxLayout>
          <Content />
        </MdxLayout>
    </div>
  );
}
