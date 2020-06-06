require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});


module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-unsplash`,
      options: {
        secretKey: process.env.UNSPLASH_SECRET_KEY,
        appId: process.env.UNSPLASH_ACCESS_KEY,
        collections: [`10621197`],
        // optional: will only get page 1, so increase this count to include > 10 photos
        perPage: `100`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-theme-ui`,
    `gatsby-transformer-sharp`,
    `gatsby-theme-style-guide`,
  ],
};
