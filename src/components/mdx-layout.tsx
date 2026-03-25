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
    <>
      <div className={caseStudy ? 'caseStudyContainer' : 'defaultContainer'}>
        {children}
      </div>
      <div className="bgBlender" />
    </>
  );
}
