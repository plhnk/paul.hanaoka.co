/** @jsx jsx */

import Footer from "../components/footer";
import Hero from "../components/hero";
import NavBar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Typography from '../components/typography'
import theme from '../gatsby-plugin-theme-ui'

import { jsx, ThemeProvider, Box } from 'theme-ui';

const Homepage = (props) => (
  <ThemeProvider theme={theme}>
    <Typography />
    <Sidebar
      image={props.data.heroImage.childImageSharp.fluid}
    />
    <Box
      sx={{
        width: ['100%', null, '56%'],
        ml: [null, null, '44%'],
      }}
      >
      <header>
        <NavBar
          sx={{
            p: 3,
            width: '100%',
            ml: [null, null, '-44%'],
            position: 'fixed',
            bottom: 0,
          }}
        />
      </header>
      <main>
        <Hero
          pretitle="Friendly introduction"
          title="paul.hanaoka.co"
          subtitle="Brief, witty bio — a small, but noteworthy acheivment."
        />
      </main>
      <Footer />
    </Box>
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

