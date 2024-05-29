'use client';
import React from 'react';
import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';
import Bio from './bio.mdx';
import HowItsMade from './how-i-built-this.mdx';
import OnPageNav from '../../components/ui/on-page-nav';
import { useSidebarContext } from '@/components/sidebar-provider';

const About: React.FC = () => {
  const sections = [
    { id: 'Bio', component: Bio },
    { id: 'Experience', component: CV },
    { id: "How It's Made", component: HowItsMade },
    { id: 'Colophon', component: Colophon },
  ];

  const categoryRefs = sections.reduce((refs, section) => {
    refs[section.id] = React.createRef();
    return refs;
  }, {} as Record<string, React.RefObject<HTMLDivElement>>);
  
  const { collapsed } = useSidebarContext();

  return (
    <MdxLayout>
      <Content />
      <div className="mb-20" />
      <OnPageNav
        collapsed={collapsed}
        className="pl-4 -ml-4"
        categories={Object.keys(categoryRefs)}
        scrollOffset={240}
      />
      {sections.map(({ id, component: Component }) => (
        <div className="mb-80" id={id} key={id} ref={categoryRefs[id]}>
          <Component />
        </div>
      ))}
    </MdxLayout>
  );
};

export default About;
