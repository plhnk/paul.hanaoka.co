'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import PeopleComponent from '@/components/people';

export default function People() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
    </>
  );
}
