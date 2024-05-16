'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import RecommendsComponent from '../../components/recommends';

// const Recommends: React.FC = () => {
export default function Recommends() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <RecommendsComponent className="mt-20" />
    </>
  );
}

// TODO --> newsletters: James Clear, ?
// TODO --> StickerMule