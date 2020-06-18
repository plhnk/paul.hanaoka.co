/** @jsx jsx */

// import { sortBy } from 'lodash';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Text, Flex, Box, useColorMode, Styled } from 'theme-ui';
import Wrapper from '../components/wrapper';
import Link from '../components/link';

export default () => {
  const [mode] = useColorMode();
  const isDark = mode === 'dark';

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

  const H2 = Styled.h2;

  const Posts = data.allMdx.edges.map(({ node }, index) => (
    <Link to={node.fields.slug} sx={{textDecoration:'none'}}>
      <Box
        sx={{
          margin: 4,
        }}
        sortDate={moment(node.frontmatter.sortDate).toDate()}
        key={node.id}
      >
        <H2>{node.frontmatter.title}</H2>
        <Text>{node.excerpt}</Text>
        <Text>{node.frontmatter.displayDate}</Text>
      </Box>
    </Link>
  ));

  return (
    <Wrapper>
      <Flex
        sx={{
          flexDirection: 'column',
          maxWidth: '80ch',
          margin: '0 auto',
        }}
      >
        {Posts}
      </Flex>
      ;
    </Wrapper>
  );
};
