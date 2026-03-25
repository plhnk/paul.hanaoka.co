import MdxLayout from '../../components/mdx-layout';
import Content from './content.mdx';
import Colophon from './colophon.mdx';
import CV from './cv.mdx';
import HowItsMade from './how-i-built-this.mdx';
import OnPageNav from '../../components/ui/on-page-nav';

const sections = [
  { id: 'Experience', component: CV },
  { id: "How It's Made", component: HowItsMade },
  { id: 'Colophon', component: Colophon },
];

const About = () => {

  return (
    <MdxLayout>
      <Content />
      <div className="mb-20" />
      <OnPageNav
        className="pl-4 -ml-4"
        categories={sections.map((section) => section.id)}
        scrollOffset={240}
      />
      {sections.map(({ id, component: Component }) => (
        <div className="mb-80" id={id} key={id}>
          <Component />
        </div>
      ))}
    </MdxLayout>
  );
};

export default About;
