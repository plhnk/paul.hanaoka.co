'use client';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';

const About: React.FC = () => {
  return (
    <MDXProvider>
      <Content />
      <Colophon />
    </MDXProvider>
  );
};

export default About;
