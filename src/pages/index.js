import React from "react";

import Footer from "../components/footer";
import Hero from "../components/hero";
import Feed from "../components/feed";

import { ThemeProvider } from 'theme-ui';

export default () => (
    <ThemeProvider>
      <Hero
        pretitle="Friendly introduction"
        title="paul.hanaoka.co"
        subtitle="Brief, witty bio — a small, but noteworthy acheivment."
        // image={image}
      >
      </Hero>
      <Feed />
      <Footer/>
    </ThemeProvider>
  );
