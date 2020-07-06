import { graphql } from 'gatsby';

export const Post = graphql`
  fragment postQuery on allMdx {
    edges {
      node {
        id
        fields {
          slug
        }
      }
    }
  }
`;
