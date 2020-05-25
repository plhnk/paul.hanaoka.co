/** @jsx jsx */

import Footer from "../components/footer";
import Hero from "../components/hero";
import Feed from "../components/feed";

import { jsx, ThemeProvider } from 'theme-ui';

const Homepage = (props) => (
  <ThemeProvider>
    <Hero
      pretitle="Friendly introduction"
      title="paul.hanaoka.co"
      subtitle="Brief, witty bio — a small, but noteworthy acheivment."
      image={props.data.heroImage.childImageSharp.fluid}
    ></Hero>
    <Feed />
    <Footer />
  </ThemeProvider>
);

export default Homepage;

export const pageQuery = graphql`
  query {
    heroImage: file(name: { eq: "cool-guy" }) {
      childImageSharp {
        fluid(maxWidth: 1000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;

