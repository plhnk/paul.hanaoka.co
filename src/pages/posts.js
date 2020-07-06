/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Flex } from 'theme-ui';
import MainLayout from '../layouts/main';
import Post from '../components/post';
import moment from 'moment';

export default () => {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: { frontmatter: { draft: { ne: "yes" } } },
        sort: { fields: frontmatter___date, order: DESC }
      ) {
        edges {
          node {
            id
            timeToRead
            frontmatter {
              tags
              title
              sortdate: date
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
      key={node.id}
      sortdate={moment(node.frontmatter.sortdate).toDate()}
      postSlug={node.fields.slug}
      superTitle={node.frontmatter.superTitle}
      postTitle={node.frontmatter.title}
      postExcerpt={node.excerpt}
      postDate={node.frontmatter.displayDate}
      readTime={node.timeToRead}
    />
  ));

  return <MainLayout sidebar="" mainContent={
    <Flex sx={{mr: [null, 5, null], flexDirection: 'column',}}>
      {Posts}
    </Flex>
  } />
}
