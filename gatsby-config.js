module.exports = {
  plugins: [
    'gatsby-theme-style-guide',
    'gatsby-plugin-theme-ui',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/assets/images/`,
      },
    },
  ],
};