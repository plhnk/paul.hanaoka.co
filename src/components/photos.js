/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import {
  jsx,
  Flex,
  useColorMode,
} from 'theme-ui';
import Photo from './photo';
import {addReferral } from '../utilities'

export default () => {

  const [mode] = useColorMode();
  const isDark = mode === 'dark';

  const data = useStaticQuery(graphql`
    {
      allUnsplashPhoto {
        edges {
          node {
            alt_description
            description
            displayDate: created_at(fromNow: true) 
            sortDate: created_at(formatString: "YY-MM-DD")
            urls {
              small
              regular
            }
            likes
            id
            user {
              links {
                html
              }
            }
            links {
              html
            }
          }
        }
      }
    }
  `);

  const UnsplashPhotos = data.allUnsplashPhoto.edges.map(({ node }) => (
    <Photo
      id={node.id}
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
      alt={node.alt_description}
      primaryAssetLink={addReferral(node.links.html)}
      primaryAsset={node.urls.regular}
      iconLink={addReferral(node.user.links.html)}
      icon="unsplash"
      displayDate={node.displayDate}
      sortDate={node.sortDate}
      caption={node.description}
    />
  ));

  return <Flex sx={{ flexDirection: 'column' }}>{UnsplashPhotos}</Flex>;
};
