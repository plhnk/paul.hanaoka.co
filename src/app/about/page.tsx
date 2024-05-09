'use client';
import React, { useEffect, useRef } from 'react';
import { MDXProvider } from '@mdx-js/react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';
import Bio from './bio.mdx';
import OnPageNav from '../../components/ui/on-page-nav';

const About: React.FC = () => {
  const sections = [
    { id: 'Bio', component: Bio},
    { id: 'Colophon', component: Colophon},
    { id: 'Experience', component: CV},
  ];

  const categoryRefs = sections.reduce((refs, section) => {
    refs[section.id] = React.createRef();
    return refs;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);

  return (
    <MDXProvider>
      <MdxLayout>
        <Content />
        <OnPageNav className='pl-1 -ml-4 sm:px-3 2xl:px-2' categories={Object.keys(categoryRefs)} scrollOffset={200} />
        {sections.map(({ id, component: Component }) => (
          <div className="mb-80" id={id} key={id} ref={categoryRefs[id]}>
            <Component />
          </div>
        ))}
      </MdxLayout>
    </MDXProvider>
  );
};

export default About;
