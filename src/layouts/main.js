/** @jsx jsx */

import React from 'react';
import Footer from '../components/footer';
import NavBar from '../components/navbar';

import Typography from '../components/typography';

import { jsx, Box } from 'theme-ui';

export default ({children}) => {

  return (
    <>
      <SEO
        description="Paul Hanaoka's website"
        pageTitle="paul.hanaoka.co | Articles and resources for designers and developers."
        twitterHandle="@plhnk"
      />
      <Typography />
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
          {children}
        </main>
        <Footer />
      </Box>
    </>
  );
};
