/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Flex, useColorMode } from 'theme-ui';
import MainLayout from '../layouts/main';
import Photo from '../components/photo';
import moment from 'moment';
import {addReferral} from '../utilities';

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
            sortDate: created_at
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

  const UnsplashPhotos = data.allUnsplashPhoto.edges.map(({ node }, index) => (
    <Photo
      id={node.id}
      key={node.id}
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
      sortDate={moment(node.sortDate).toDate()}
      caption={node.description}
    />
  ));


  return <MainLayout sidebar="" mainContent={
    <Flex sx={{mr: [null, 5, null], flexDirection: 'column',}}>
      {UnsplashPhotos}
    </Flex>
  } />
}
