'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';

export default function People() {
  return (
    <>
      <MdxLayout caseStudy={true}>
        <Content />
      </MdxLayout>
    </>
  );
}
