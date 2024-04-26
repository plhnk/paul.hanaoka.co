'use client';
import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
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
      <ProjectsComponent />
    </div>
  );
}
// };

// export default Projects;

// TODOs
// project card
// project modal (figma embed)

// Parsing Figma embed URLs
// = %3D
// & %26
// / %2F

// options
// &disable-default-keyboard-nav%3D1
// &hide-ui%3D1
// &mode=design

// scaling options
// &scaling=scale-down
// &scaling=scale-down-width
// &scaling=contain
