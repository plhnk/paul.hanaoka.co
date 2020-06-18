/** @jsx jsx */

import {
  jsx,
  Text,
  Box,
  useColorMode,
  Styled
} from 'theme-ui';
import Link from './link';
import moment from 'moment';

export default ({
  id,
  sortDate,
  postSlug,
  postTitle,
  postExcerpt,
  postDate,
}) => {
  let alignments = ['flex-start', 'center', 'flex-end'];

  let randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];

  const [mode] = useColorMode();
  const isDark = mode === 'dark';
  const H2 = Styled.h2
  return (
    <Link
      sortDate={sortDate}
      to={postSlug}
      sx={{ textDecoration: 'none' }}
    >
      <Box
        sx={{
          mt: 6,
          maxWidth: '70ch',
        }}
        key={id}
      >
        <H2>{postTitle}</H2>
        <Text>{postExcerpt}</Text>
        <Text sx={{ mt: 2 }}>{postDate}</Text>
      </Box>
    </Link>
  )
};

// TODOs
// add copy ID to clipboard
// add actual date on year hover
