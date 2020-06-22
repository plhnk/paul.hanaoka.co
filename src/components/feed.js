/** @jsx jsx */

import { sortBy } from 'lodash';
import moment from 'moment';
import { useStaticQuery, graphql } from 'gatsby';
import { jsx, Flex, useColorMode } from 'theme-ui';
import Photo from './photo';
import { addReferral } from '../utilities';
import Post from './post';

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
            sortdate: created_at
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
            timeToRead
            frontmatter {
              tags
              superTitle
              title
              sortdate: date
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
      sortdate={moment(node.sortdate).toDate()}
      caption={node.description}
    />
  ));

  const Posts = data.allMdx.edges.map(({ node }, index) => (
    <Post
      key={node.id}
      sortdate={moment(node.frontmatter.sortdate).toDate()}
      postSlug={node.fields.slug}
      superTitle={node.frontmatter.superTitle}
      postTitle={node.frontmatter.title}
      postExcerpt={node.excerpt}
      postDate={node.frontmatter.displayDate}
      readTime={node.timeToRead}
    />
  ));

  const Feed = [...Posts, ...UnsplashPhotos]; // make a new array w/all items

  // choose a way to sort — note the negative sets its to most recent post first
  const sortByProperty = (obj) => -obj.props.sortdate;

  const LinearFeed = sortBy(Feed, sortByProperty);

  return (
      <Flex sx={{ mr: [null, 5, null], flexDirection: 'column' }}>{LinearFeed}</Flex>
  );
};
