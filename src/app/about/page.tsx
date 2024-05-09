'use client';
import React, { useRef } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';
import Bio from './bio.mdx';
import OnPageNav from '../../components/ui/on-page-nav';

const About: React.FC = () => {
  // const contentRef = useRef<HTMLDivElement>(null);
  const colophonRef = useRef<HTMLDivElement>(null);
  const cvRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  const categories = ['Bio','Colophon', 'Experience'];

  return (
    <MDXProvider>
      <MdxLayout>
        {/* <div id="content" ref={contentRef}> */}
          <Content />
        <OnPageNav categories={categories} scrollOffset={200}/>
        {/* </div> */}
        <div id="bio" ref={bioRef}>
          <Bio />
        </div>
        <div id="colophon" ref={colophonRef}>
          <Colophon />
        </div>
        <div id="cv" ref={cvRef}>
          <CV />
        </div>
      </MdxLayout>
    </MDXProvider>
  );
};

export default About;