/** @jsx jsx */

import { jsx, Styled, Flex, Box } from 'theme-ui';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MainLayout from './main';

import Link from '../components/link';
import SEO from '../components/seo';

const shortcodes = { Link }; // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  const featuredImgFluid = mdx.frontmatter.featuredImage ? mdx.frontmatter.featuredImage.childImageSharp.fluid : null;
  // const H1 = Styled.h1
  return (
    <MainLayout
      sidebar={
        <Flex
          sx={{
            justifyContent: 'center',
            bottom: 0,
            position: ['relative', 'fixed', null],
            width: ['100%', '100%', '40%'],
            height: ['80vh', '100vh', null],
            flexDirection: 'column',
            p: 3,
            zIndex: 2,
          }}
        >
          <div sx={{ margin: 'auto' }} />
          {mdx.frontmatter.featuredImage ? <Img fluid={featuredImgFluid} /> : null}
          <Styled.h2>{mdx.frontmatter.superTitle}</Styled.h2>
          <Styled.h1 sx={{mb: 1,}}>{mdx.frontmatter.title}</Styled.h1>
          <Styled.h2 sx={{m:0}}>{mdx.frontmatter.subtitle}</Styled.h2>
          <div sx={{ margin: 'auto' }} />
        </Flex>
      }
      mainContent={
        <Box
          sx={{
            ml: [null, 3, null],
            maxWidth: '80ch',
          }}
        >
          <MDXProvider components={shortcodes}>
            <SEO canonicalLink={mdx.frontmatter.canonicalLink} />
            <MDXRenderer>{mdx.body}</MDXRenderer>
          </MDXProvider>
        </Box>
      }
    />
  );
}
export const pageQuery = graphql`
         query BlogPostQuery($id: String) {
           mdx(
             id: { eq: $id }
           ) {
             id
             body
             frontmatter {
               superTitle
               title
               subtitle
               canonicalLink
               featuredImage {
                 childImageSharp {
                   fluid(maxWidth: 800) {
                     ...GatsbyImageSharpFluid
                   }
                 }
               }
             }
           }
         }
       `;
