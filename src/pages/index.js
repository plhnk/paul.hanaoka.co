/** @jsx jsx */

import React from 'react';
import Footer from '../components/footer';
import Hero from '../components/hero';
import NavBar from '../components/navbar';
import Sidebar from '../components/sidebar';
import Typography from '../components/typography';
import { useStaticQuery, graphql } from 'gatsby';

import { jsx, Box } from 'theme-ui';
import Feed from '../components/feed';
import SEO from '../components/seo';
import TimeSensitiveTheme from '../components/timeSensitiveTheme';

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
      <SEO
        description="Paul Hanaoka's website"
        pageTitle="paul.hanaoka.co | Articles and resources for designers and developers."
        twitterHandle='@plhnk'
       />
      <Typography />
      <TimeSensitiveTheme />
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
            title={
              <>
                <span sx={{ color: 'neutral1' }}>paul</span>
                <span sx={{ color: 'neutral5' }}>.hanaoka</span>
                <span sx={{ color: 'neutral7' }}>.co</span>
              </>
            }
            subtitle="Brief, witty bio — a small, but noteworthy achievement."
          />
          <Feed />
        </main>
        <Footer />
      </Box>
    </>
  );
};
