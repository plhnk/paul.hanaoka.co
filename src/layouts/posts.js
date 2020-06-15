/** @jsx jsx */

import { jsx, Box } from 'theme-ui';
import React from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { graphql } from 'gatsby';

export default class Posts extends React.Component {
  render() {
    const post = this.props.data.mdx;

    return (
      <Box>
        {post.frontmatter.tags}
        <MDXRenderer>
          <div>{post.body}</div>
        </MDXRenderer>
      </Box>
    );
  }
}

export const pageQuery = graphql`
  query($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      timeToRead
      frontmatter {
        tags
      }
      excerpt
      body
    }
  }
`;
