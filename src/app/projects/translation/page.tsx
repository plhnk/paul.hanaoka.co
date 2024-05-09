'use client';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../../components/mdx-layout';
import Content from './content.mdx';
import ProjectsComponent from '@/components/projects';

// const Projects: React.FC = () => {
export default function Projects() {
  return (
    <div className="main-content">
      <MDXProvider>
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider>
      {/* <ProjectsComponent /> */}
    </div>
  );
}
