import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import ProjectsComponent from '@/components/projects';

export default function Projects() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <ProjectsComponent variant="all" className="col-start-1 col-span-full" />
    </>
  );
}
