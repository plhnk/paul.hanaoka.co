/** @jsx jsx */

import {
  jsx,
  Text,
  Flex,
  Box,
  useColorMode,
  Styled
} from 'theme-ui';
import Link from './link';


export default ({
  id,
  sortDate,
  postSlug,
  postTitle,
  postExcerpt,
  postDate,
  readTime
}) => {
  let alignments = ['flex-start', 'center', 'flex-end'];

  let randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];

  const [mode] = useColorMode();
  const isDark = mode === 'dark';
  const H2 = Styled.h2
  return (
    <Link sortDate={sortDate} to={postSlug} sx={{ textDecoration: 'none' }}>
      <Box
        sx={{
          p: [null, 3, null],
          mt: 6,
          maxWidth: '70ch',
        }}
        key={id}
      >
        <H2>{postTitle}</H2>
        <Text>{postExcerpt}</Text>
        <Flex sx={{ mt: 3, justifyContent: 'space-between', alignItems: 'center' }}>
          <Text sx={{color: 'neutral4', variant: 'text.italic',}}>{readTime} min read</Text>
          <Text>{postDate}</Text>
        </Flex>
      </Box>
    </Link>
  );
};
