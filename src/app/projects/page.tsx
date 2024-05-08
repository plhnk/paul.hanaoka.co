import React from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import ProjectsComponent from '@/components/projects';
import useProjectsData from '@/lib/hooks/useProjectsData';

export default async function Projects() {
  const projectsData = await useProjectsData();

  return (
    <>
      <ProjectsComponent projects={projectsData} />
      {/* <MDXProvider >
        <MdxLayout>
          <Content />
        </MdxLayout>
      </MDXProvider> */}
    </>
  );
}

// hide mdx content for now..... 
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
