'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import RecommendsComponent from '../../components/recommends';
import { useSidebarContext } from '@/components/sidebar-provider';

export default function Recommends() {
  const { collapsed } = useSidebarContext();
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
