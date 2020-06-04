/** @jsx jsx */

import { jsx, Text } from 'theme-ui'
import Wrapper from '../components/wrapper';
import Link from './link';

export default () => (
  <footer
    sx={{
      mb:[5,null, 4]
    }}
  >
    <Wrapper>
      <Text sx={{color: 'neutral1'}}>
        Financed by{' '}
        <Link to="https://liferay.com">
          Liferay
        </Link>
        , powered by{' '}
        <Link to="https://gatsbyjs.com">
          Gatsby
        </Link>
        , hosted by{' '}
        <Link to="https://netlify.com">
          Netlify
        </Link>
        .
      </Text>
      <Text 
        sx={{color: 'neutral3'}}
      >
        Copyright © {new Date().getFullYear()} Paul Hanaoka.
      </Text>
    </Wrapper>
  </footer>
);