module.exports = {
    plugins:
    [
        {
          resolve: `gatsby-source-filesystem`,
          options: {
            name: `images`,
            path: `${__dirname}/src/images/`,
          },
        },
        `gatsby-plugin-styled-components`,
      ],
    }