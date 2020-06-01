/** @jsx jsx */

import React from 'react';
import Footer from '../components/footer';
import Hero from '../components/hero';
import NavBar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Typography from '../components/typography';
import { useStaticQuery, graphql } from 'gatsby';

import { jsx, Box, useColorMode } from 'theme-ui';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      darkImage: file(name: { eq: "dank-guy" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      lightImage: file(name: { eq: "lite-guy" }) {
        childImageSharp {
          fluid(maxWidth: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <>
      <Typography />
      <Sidebar
        image={data.lightImage.childImageSharp.fluid}
        darkImage={data.darkImage.childImageSharp.fluid}
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
    </>
  );
};
