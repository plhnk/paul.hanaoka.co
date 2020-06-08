/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import {
  jsx,
  Flex,
  useColorMode,
} from 'theme-ui';
import Card from './Card';

export default ({}) => {

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
