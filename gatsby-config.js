module.exports = {
    plugins:
    [
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `images`,
            path: `${__dirname}/assets/images/`,
          },
        },
        `gatsby-plugin-styled-components`,
      ],
    }