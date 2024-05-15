import { MDXProvider } from '@mdx-js/react';

export default function MdxLayout({ children }: { children: React.ReactNode }) {
  return (
    <MDXProvider>
      <div className="pt-7 main-content ml-[unset] block prose dark:prose-invert prose-neutral prevent-orphans">
        {children}
      </div>
      <div className='bgBlender'/>
    </MDXProvider>
  );
}
