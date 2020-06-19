/** @jsx jsx */

import React from 'react';
import Footer from '../components/footer';
import NavBar from '../components/navbar';

import Typography from '../components/typography';
import SEO from '../components/seo';
import TimeSensitiveTheme from '../components/timeSensitiveTheme';
import { jsx, Box } from 'theme-ui';
import Wrapper from '../components/wrapper';

function MainLayout(props) {
  return (
    <>
      <SEO
        description="Paul Hanaoka's website"
        pageTitle="paul.hanaoka.co | Articles and resources for designers and developers."
        twitterHandle="@plhnk"
      />
      <Typography />
      <TimeSensitiveTheme />
        {props.sidebar}
      <Box
        sx={{
          width: ['100%', null, '56%'],
          ml: [null, null, '44%'],
        }}
      >
        <header>
          <NavBar
            sx={{
              p: 3,
              width: '100%',
              ml: [null, null, '-44%'],
              position: 'fixed',
              bottom: 0,
            }}
          />
        </header>
        <main>
          <Wrapper>
            {props.mainContent}
          </Wrapper>
        </main>
        <Footer />
      </Box>
    </>
  );
}

export default MainLayout;
