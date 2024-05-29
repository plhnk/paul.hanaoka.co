'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import RecommendsComponent from '../../components/recommends';

// const Recommends: React.FC = () => {

interface RecommendsProps {
  collapsed?: boolean;
}

export default function Recommends({ collapsed }: RecommendsProps) {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <RecommendsComponent collapsed={collapsed} className="mt-20" />
    </>
  );
}

// TODO --> newsletters: James Clear, ?
// TODO --> StickerMule
