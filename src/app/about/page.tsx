'use client';
import React from 'react';

import { MDXProvider } from '@mdx-js/react';
import Content from './content.mdx';
import CV from './cv.mdx';

const About: React.FC = () => {
  return (
    <MDXProvider>
      <Content />
    </MDXProvider>
  );
};

export default About;
