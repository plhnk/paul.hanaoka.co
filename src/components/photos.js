/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import {
  jsx,
  Text,
  Image,
  Flex,
  Box,
  IconButton,
  useColorMode,
} from 'theme-ui';
import Icon from './icon';
import { ICONS } from '../utilities/constants.js';
import Link from './link';
import Card from './Card';

export default ({ align }) => {
  let alignments = ['flex-start', 'center', 'flex-end'];

  let randomAlignment =
    alignments[Math.floor(Math.random() * alignments.length)];

  const [mode] = useColorMode();
  const isDark = mode === 'dark';

  const data = useStaticQuery(graphql`
    {
      allUnsplashPhoto {
        edges {
          node {
            description
            created_at(fromNow: true)
            urls {
              small
              regular
            }
            likes
            links {
              html
            }
          }
        }
      }
    }
  `);

  const UnsplashPhotos = data.allUnsplashPhoto.edges.map(({ node }) => (
    <Card
      cardStyles={{
        '::before': isDark
          ? null
          : {
              content: '""',
              background: `${'url(' + node.urls.small + ')'}`,
              position: 'absolute',
              bottom: '2%',
              left: '10%',
              filter: 'blur(24px)',
              opacity: 0.8,
              height: '80%',
              width: '80%',
              zIndex: 1,
            },
      }}
      primaryAssetLink={node.links.html}
      primaryAsset={node.urls.regular}
      iconLink="https://unsplash.com/@plhnk"
      icon="unsplash"
      date={node.created_at}
      caption={node.description}
    />
  ));

  return <Flex sx={{ flexDirection: 'column' }}>{UnsplashPhotos}</Flex>;
};
