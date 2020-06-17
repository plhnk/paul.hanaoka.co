/** @jsx jsx */

import { jsx, Styled, Flex } from 'theme-ui';
import { graphql } from 'gatsby';
import { MDXProvider } from '@mdx-js/react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import MainLayout from './main';

import Link from '../components/link';
import SEO from '../components/seo';

const shortcodes = { Link }; // Provide common components here

export default function PageTemplate({ data: { mdx } }) {
  const H1 = Styled.h1

  return (
    <MainLayout
      sidebar={
        <Flex>
          <SEO canonicalLink={mdx.frontmatter.canonicalLink} />
          <H1>{mdx.frontmatter.title}</H1>
        </Flex>
      }
      mainContent={
        <MDXProvider components={shortcodes}>
          <MDXRenderer>{mdx.body}</MDXRenderer>
        </MDXProvider>
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
