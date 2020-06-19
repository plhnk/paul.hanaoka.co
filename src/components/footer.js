/** @jsx jsx */

import { jsx, Text } from 'theme-ui';
import Wrapper from '../components/wrapper';
import Link from './link';
import { useMediaQuery } from 'react-responsive';

export default () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  return (
    <footer
      sx={{
        mb: [5, null, 4],
        ml: [null, 3, null]
      }}
    >
      <Wrapper>
        <Text sx={{ color: 'neutral1' }}>
          {isMobile ? '💵' : 'Financed by'} {' '}
          <Link to="https://liferay.com">Liferay</Link>,{' '}
          {isMobile ? '⚡️' : 'powered by'} {' '}
          <Link to="https://gatsbyjs.com">Gatsby</Link>,{' '}
          {isMobile ? '🏡' : 'hosted by'} {' '}
          <Link to="https://netlify.com">Netlify</Link>.
        </Text>
        <Text sx={{ color: 'neutral3' }}>
          Copyright © {new Date().getFullYear()} Paul Hanaoka.
        </Text>
      </Wrapper>
    </footer>
  );
};
