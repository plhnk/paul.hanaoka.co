/** @jsx jsx */

import { Flex } from 'theme-ui';
import Img from 'gatsby-image';
import { jsx } from 'theme-ui';

export default ({ image }) => (
    <Flex
      sx={{
        alignItems: 'flex-end',
        bottom: 0,
        position: ['absolute', null, 'fixed'],
        width: ['100%', '100%', '50%'],
        height: '100vh',
        zIndex: -1,
      }}
    >
      <Img
        sx={{
          maxWidth: ['100vw', null, '50vw'],
          width: '100%',
        }}
        fluid={image}
      />
    </Flex>
);
