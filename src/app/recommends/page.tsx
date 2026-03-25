import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import RecommendsComponent from '../../components/recommends';

export default function Recommends() {
  return (
    <>
      <MdxLayout>
        <Content />
      </MdxLayout>
      <RecommendsComponent className="mt-20" />
    </>
  );
}
