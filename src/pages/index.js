// eslint-disable-next-line 
import React from "react";
import Footer from "../components/footer";
import Hero from "../components/hero";
import Feed from "../components/feed";

// import ThemeToggle from "../components/ThemeToggle";
import { ThemeProvider } from 'theme-ui';

export default () => (
    <ThemeProvider>
      <Hero
        pretitle="Pretitle"
        title="Title"
        subtitle="Subtitle"
        // image={image}
      >
      </Hero>
      <Feed><a href="3">test</a></Feed>
      <Footer/>
    </ThemeProvider>
  );
