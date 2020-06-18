/** @jsx jsx */

import { jsx, Styled, Button, Flex, Box } from 'theme-ui';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MainLayout from './main';

import Link from '../components/link';
import SEO from '../components/seo';

const shortcodes = { Link }; // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  // const H1 = Styled.h1
  return (
    <MainLayout
      sidebarContent={
        <Flex
          sx={{
            justifyContent: 'center',

            bottom: 0,
            position: ['fixed'],
            width: ['100%', '100%', '40%'],
            height: '100vh',
            zIndex: 0,
            flexDirection: 'column',
            p: 3,
            zIndex: 2,
          }}
        >
          <Link sx={{alignSelf:'flex-start'}} to="/posts">All posts</Link>
          <div sx={{margin:'auto'}}/>
          <Styled.h1>{mdx.frontmatter.title}</Styled.h1>
          <div sx={{margin:'auto'}}/>
        </Flex>
      }
      mainContent={
        <Box
          sx={{
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
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        canonicalLink
      }
    }
  }
`;
