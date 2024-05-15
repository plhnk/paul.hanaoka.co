'use client';
import React from 'react';
import MdxLayout from '../../../components/mdx-layout';
import Content from './content.mdx';

// const Projects: React.FC = () => {
export default function Projects() {
  return (
    <div className="main-content">
      <MdxLayout>
        <Content />
      </MdxLayout>
    </div>
  );
}
