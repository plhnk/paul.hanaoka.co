/** @jsx jsx */

// import { sortBy } from 'lodash';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Text, Flex, Box, useColorMode } from 'theme-ui';
import Wrapper from '../components/wrapper';
import Link from '../components/link';

export default () => {
  const [mode] = useColorMode();
  const isDark = mode === 'dark';

  const data = useStaticQuery(graphql`
    {
      allMdx {
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
    <Box sortDate={moment(node.frontmatter.sortDate).toDate()} key={node.id}>
      <Link to={node.fields.slug}>{node.frontmatter.title}</Link>
      <Text>{node.excerpt}</Text>
      <Text>{node.frontmatter.displayDate}</Text>
    </Box>
  ));

  return (
    <Wrapper>
      <Flex sx={{ flexDirection: 'column' }}>{Posts}</Flex>;
    </Wrapper>
  );
};
