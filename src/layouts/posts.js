import { MDXRenderer } from 'gatsby-plugin-mdx';

import { graphql } from 'gatsby';
import React, { Component } from 'react';

export default class Posts extends Component {
  render() {
    const post = this.props.data.mdx;

    return (
      <div>
        {post.frontmatter.tags}
        <MDXRenderer>
          <div>{post.body}</div>
        </MDXRenderer>
      </div>
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
