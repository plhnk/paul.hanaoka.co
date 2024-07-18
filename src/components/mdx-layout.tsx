import { MDXProvider } from '@mdx-js/react';
import '../app/globals.css';

interface MdxLayoutProps {
  children: React.ReactNode;
  caseStudy?: boolean; // Optional boolean prop
}

export default function MdxLayout({
  children,
  caseStudy = false,
}: MdxLayoutProps) {
  return (
    <MDXProvider>
      <div className={caseStudy ? 'caseStudyContainer' : 'defaultContainer'}>
        {children}
      </div>
      <div className="bgBlender" />
    </MDXProvider>
  );
}
