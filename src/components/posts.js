/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import {
  Text,
  jsx,
  Flex,
  useColorMode,
  Box,
} from 'theme-ui';
import Link from './link';

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
              sortDate: date(formatString: "YY-MM-DD")
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

  const Posts = data.allMdx.edges.map(({ node }) => (
    <Box sortDate={node.frontmatter.sortDate}>
      <Link to={node.fields.slud}>{node.frontmatter.title}</Link>
      <Text>{node.excerpt}</Text>
      <Text>{node.frontmatter.displayDate}</Text>
    </Box>
  ));

  return <Flex sx={{ flexDirection: 'column' }}>{Posts}</Flex>;
};
