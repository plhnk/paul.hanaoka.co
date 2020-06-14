/** @jsx jsx */

import React from 'react';
import { graphql } from 'gatsby';
import { Layout } from '../layouts/posts'

import { jsx } from 'theme-ui';

export default ({ data }) => {
  return (
      <Layout>
        {data.allMdx.edges.map(({ node }, index) => (
            <div>{node.fields.slug}</div>
        ))}
      </Layout>
  );
};

export const query = graphql`
  {
    allMdx {
      edges {
        node {
          id
          frontmatter {
            tags
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
