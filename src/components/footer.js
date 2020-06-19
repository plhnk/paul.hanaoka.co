/** @jsx jsx */

import { jsx, Text, Flex, Box } from 'theme-ui';
import Wrapper from '../components/wrapper';
import Link from './link';
import { useMediaQuery } from 'react-responsive';

export default (props) => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  return (
    <footer
      sx={{
        mb: [5, null, 4],
        ml: [null, 3, null]
      }}
    >
      <Wrapper>
        <Flex>

          <Box>  
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
          </Box>
          {
          /* TODO improve footer
          <div sx={{m:'auto'}}/>
          {props.isHome ? 
            <Text>To Top</Text>
            :
            <Link to='/posts'>All posts</Link>
          } */}
        </Flex>
      </Wrapper>
    </footer>
  );
};
