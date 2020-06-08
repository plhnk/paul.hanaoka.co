/** @jsx jsx */

import {
  jsx,
  Text,
  Card,
  Image,
  Flex,
  Box,
  IconButton,
  useColorMode,
} from 'theme-ui';
import Link from './link';
import Icon from './icon';

export default ({
  cardStyles,
  primaryAssetLink,
  primaryAsset,
  iconLink,
  icon,
  date,
  caption,
}) => {
  let alignments = ['flex-start', 'center', 'flex-end'];

  let randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];

  const [mode] = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Card
      sx={{
        alignSelf: `${randomAlignment}`,
        mt: 6,
        mb: 7,
        position: 'relative',
        width: ['initial', null, '40vmax'],
      }}
    >
      <Box
        sx={{
          ...cardStyles,
          p: 3,
          backgroundColor: 'neutral9',
          boxShadow: (theme) =>
            isDark
              ? `0 0 8px ${theme.colors.darken}, 0 16px 48px -32px ${theme.colors.darken}`
              : null,
          position: 'inherit',
        }}
      >
        <Link to={primaryAssetLink}>
          <Image src={primaryAsset} sx={{ width: '100%' }} />
        </Link>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to={iconLink}>
            <IconButton>
              <Icon label={icon} name={icon} />
            </IconButton>
          </Link>
          <Text>{date}</Text>
        </Flex>
      </Box>
      <Text sx={{ mt: 3, ml: 3, color: 'neutral4', variant: 'text.italic' }}>
        {caption}
      </Text>
    </Card>
  );
};
