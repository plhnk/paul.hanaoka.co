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
  alt,
  cardStyles,
  primaryAssetLink,
  primaryAsset,
  iconLink,
  icon,
  displayDate,
  sortdate,
  id,
  caption,
}) => {
  let alignments = ['0', '12%', '24%'];

  let randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];

  const [mode] = useColorMode();
  const isDark = mode === 'dark';

  return (
    <Card
      sortdate={sortdate}
      id={id}
      sx={{
        // alignSelf: `${randomAlignment}`,
        mt: 6,
        mb: 7,
        position: 'relative',
        width: ['initial', null, '40vmax'],
        transition: 'transform .4s ease-in-out',
        transform: [0, 0, `translateX(${randomAlignment})`],
        // save animation example for when I need it
        // animation: 'animateIn .5s ease-in-out',
        // '@keyframes animateIn': {
        //   'from': {
        //     transform: 'translateX(40px)',
        //   },
        //   'to': {
        //     transform: 'translateX(0)',
        //   },
        // },
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
        <Link
          to={primaryAssetLink}
          aria-label={'link to photo of ' + alt + ' on Unsplash.com'}
        >
          <Image
            alt={alt ? alt : 'photo by Paul Hanaoka from Unsplash.com'}
            src={primaryAsset}
            sx={{ width: '100%' }}
            loading="lazy"
          />
        </Link>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to={iconLink}
            aria-label={`link to @plhnk's profile on` + icon + '.com'}
          >
            <IconButton aria-label={icon + 'button'}>
              <Icon label={icon} name={icon} />
            </IconButton>
          </Link>
          <Text>{displayDate}</Text>
        </Flex>
      </Box>
      <Text sx={{ mt: 3, ml: 3, color: 'neutral4', variant: 'text.italic' }}>
        {caption}
      </Text>
    </Card>
  );
};

// TODOs
// add copy ID to clipboard
// add actual date on year hover
