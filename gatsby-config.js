

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});


module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `content`,
        path: `${__dirname}/src/content/posts/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        secretKey: process.env.UNSPLASH_SECRET_KEY,
        appId: process.env.UNSPLASH_ACCESS_KEY,
        collections: [`10621197`],
        perPage: `100`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Paul Hanaoka`,
        short_name: `paul.hanaoka.co`,
        background_color: `#FFF`,
        theme_color: `#0b5fff`,
        include_favicon: false,
      },
    },
    `gatsby-remark-images`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1035,
            },
          },
        ],
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-theme-ui`,
    `gatsby-theme-style-guide`,
  ],
};
