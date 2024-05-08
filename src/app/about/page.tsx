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

  const categories = ['bio','colophon', 'cv'];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    const top = element.getBoundingClientRect().top + window.pageYOffset - 200;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  return (
    <MDXProvider>
      <MdxLayout>
        {/* <div id="content" ref={contentRef}> */}
          <Content />
        <OnPageNav categories={categories} scrollTo={scrollTo} />
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