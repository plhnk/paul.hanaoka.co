'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import ProjectsComponent from '@/components/projects';

export default function Projects() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <ProjectsComponent variant='all' className='col-start-1 col-span-full' />
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
