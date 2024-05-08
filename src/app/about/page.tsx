'use client';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';

const About: React.FC = () => {
  return (
    <MDXProvider>
      <MdxLayout>
        <Content />
        <Colophon />
        {/* <CV /> */}
      </MdxLayout>
    </MDXProvider>
  );
};

export default About;
