/** @jsx jsx */

import { jsx, Text, Flex, Styled } from 'theme-ui';
import Link from './link';

export default ({
  id,
  sortdate,
  postSlug,
  superTitle,
  postTitle,
  postExcerpt,
  postDate,
  readTime,
}) => {
  const H2 = Styled.h2;
  return (
    <Link
      sortdate={sortdate}
      to={postSlug}
      sx={{
        textDecoration: 'none',
        mt: 6,
        '&:hover': { backgroundColor: ['initial','neutral9', null] },
        '&:hover h2': { color: ['primary','neutral1', null] },
        p: [null, 3, null],
        maxWidth: '70ch',
      }}
      key={id}
    >
        <Text
          as="h3"
          sx={{ fontSize: 2, color: 'neutral2', variant: 'text.smallcaps' }}
        >
          {superTitle}
        </Text>
        <H2 sx={{ mt:1, color: 'neutral2' }}>{postTitle}</H2>
        <Text sx={{ color: 'neutral3' }}>{postExcerpt}</Text>
        <Flex
          sx={{ mt: 3, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Text sx={{ color: 'neutral4', variant: 'text.italic' }}>
            {readTime} min read
          </Text>
          <Text>{postDate}</Text>
        </Flex>
    </Link>
  );
};
