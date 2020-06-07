/** @jsx jsx */

import { useStaticQuery, graphql } from 'gatsby';
import moment from 'moment';
import { jsx, Text, Card, Image, Flex, Box, IconButton } from 'theme-ui';
import Icon from './icon';
import { ICONS } from '../utilities/constants.js';
import Link from './link';

export default ({}) => {
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
      sx={{
        mt: 6,
        mb: 7,
        position: 'relative',
        width: ['initial', null, '30vmax'],
      }}
    >
      <Image
        src={node.urls.small}
        sx={{
          position: 'absolute',
          top: '80px',
          left: '10%',
          filter: 'blur(24px)',
          opacity: 0.8,
          height: 'auto',
          width: '80%',
          zIndex: 1,
        }}
      />
      <Box sx={{ p: 3, backgroundColor: 'neutral9' }}>
        <Link to={node.links.html}>
          <Image src={node.urls.small} sx={{ width: '100%' }} />
        </Link>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="https://unsplash.com/@plhnk">
            <IconButton>
              <Icon label={'unsplash'} icon={ICONS.unsplash} />
            </IconButton>
          </Link>
          <Text>{node.created_at}</Text>
        </Flex>
      </Box>
      <Text sx={{ mt: 2, ml: 3, color: 'muted', variant: 'text.italic' }}>
        {node.description}
      </Text>
    </Card>
  ));

  return <div>{UnsplashPhotos}</div>;
};
