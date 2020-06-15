/** @jsx jsx */

import { sortBy } from 'lodash';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Text, Box, useColorMode } from 'theme-ui';
import Photo from './photo';
import { addReferral } from '../utilities';
import Link from './link';

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
      allMdx {
        edges {
          node {
            id
            frontmatter {
              tags
              title
              sortDate: date
              displayDate: date(fromNow: true)
            }
            fields {
              slug
            }
            excerpt
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

  const Posts = data.allMdx.edges.map(({ node }, index) => (
    <Box sortDate={moment(node.frontmatter.sortDate).toDate()} key={node.id}>
      <Link to={node.fields.slud}>{node.frontmatter.title}</Link>
      <Text>{node.excerpt}</Text>
      <Text>{node.frontmatter.displayDate}</Text>
    </Box>
  ));

  const Feed = [...Posts, ...UnsplashPhotos]; // make a new array w/all items

  // choose a way to sort — note the negative sets its to most recent post first
  const sortByProperty = (obj) => -obj.props.sortDate;

  const LinearFeed = sortBy(Feed, sortByProperty);

  return <div>{LinearFeed}</div>;
};
