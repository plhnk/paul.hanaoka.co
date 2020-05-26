/** @jsx jsx */

import { jsx, Text } from 'theme-ui'
import Wrapper from '../components/wrapper';

export default () => (
  <footer>
    <Wrapper>
      <Text>
        Financed by{' '}
        <a href="https://liferay.com" target="_new">
          Liferay
        </a>
        , powered by{' '}
        <a href="https://gatsbyjs.com" target="_new">
          Gatsby
        </a>
        , hosted by{' '}
        <a href="https://netlify.com" target="_new">
          Netlify
        </a>
        .
      </Text>
      <Text>
        Copyright © {new Date().getFullYear()} Paul Hanaoka. Alt right reversed.
      </Text>
    </Wrapper>
  </footer>
);