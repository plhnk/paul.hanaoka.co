/** @jsx jsx */

import React from 'react';
import Hero from '../components/hero';
import Sidebar from '../components/sidebar';
import { useStaticQuery, graphql } from 'gatsby';

import { jsx } from 'theme-ui';
import Feed from '../components/feed';

import MainLayout from '../layouts/main';

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
    <MainLayout
      sidebar=
      {
        <Sidebar
          image={data.lightImage.childImageSharp.fluid}
          darkImage={data.darkImage.childImageSharp.fluid}
        />
      }
      mainContent=
      {
        <>
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
        </>
      }
    />
  );
};
