/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import { jsx } from 'theme-ui';
import MainLayout from '../layouts/main';
import Post from '../components/post';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            id
            frontmatter {
              tags
              title
              sortDate: date
              displayDate: date(fromNow: true)
            }
            fields {
              slug
            }
            excerpt
          }
        }
      }
    }
  `);

  const Posts = data.allMdx.edges.map(({ node }, index) => (
    <Post
      sortDate={node.frontmatter.sortDate}
      postSlug={node.fields.slug}
      postTitle={node.frontmatter.title}
      postExcerpt={node.excerpt}
      postDate={node.frontmatter.displayDate}
      id={node.id}
    />
  ))

  return <MainLayout sidebar="" mainContent={Posts} />
}
