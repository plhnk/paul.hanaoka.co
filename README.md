# Hello World

This is my website &mdash; there are many like it, but this is mine.

Check it out at [paul.hanaoka.co](https://paul.hanaoka.co).

It's built with [Gatsby](https://gatsbyjs.org) and powered by [Netlify](https://netlify.com).

## Architecture

### Would like to use

1. Use [Theme UI](www.theme-ui.com) to design/theme/style the site.
   1. Gives me multiple themes — light/dark/etc
   1. Makes styling easier and more consistent
   1. Use the [Figma plugin](https://www.figma.com/community/plugin/797015796747379907/Theme-UI) to go between design and dev
1. Use MDX for articles, etc
   1. All the power of react in markdown (components, etc)
1. Organize / document process for archiving the site
   1. v1.paul.hanaoka.co etc
1. Use [Typescript](https://github.com/liferay-design/liferay.design/issues/711)

### Need to decide

1. Use [Sanity](wwww.sanity.io) as the backend/CMS ?
   1. Do I want to be dependant on a CMS?
   1. MD/MDX is more portable?
   1. MDX is more powerful? Can I use MDX in Sanity?
1. Start fresh or continue in this repo?
   1. Figure out what would best facilitate #3 in Architecture

### Decisions

1. Keep using [Rebass](https://rebassjs.org/) — primitive component library
   1. Uninstall styled-components / plugin

## TODOs

1. Install Theme UI
1. Refactor site from the TU paradigm
1. Use [gatsby-theme-style-guide](https://theme-ui.com/packages/gatsby-theme-style-guide)

## Long-Term TODOs

1. Make a [Gatsby Theme](https://www.gatsbyjs.org/docs/themes/) to use as a boilerplate for other sites.
1. Make a [typography.js theme](https://kyleamathews.github.io/typography.js/).
1. Learn about Jest/[testing in general](https://www.gatsbyjs.org/docs/testing-react-components/).
1. Clean up repo (make branches for the first two versions of the site)
