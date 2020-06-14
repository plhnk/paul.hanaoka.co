const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);
const _ = require('lodash');
const moment = require(`moment`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Mdx') {
    const slug = createFilePath({ node, getNode }).replace('/content/', '/');

    createNodeField({
      node,
      name: 'slug',
      value: slug,
    });
  }
};

// disable createPages until I can figure out layouts 
// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions;

//   const markdown = graphql(`
//     {
//       markdown: allMdx {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               tags
//             }
//             body
//           }
//         }
//       }
//     }
//   `).then(({ data, errors }) => {
//     if (errors) {
//       console.log(
//         'Error creating markdown pages in `createPages` call ==>',
//         errors
//       );
//       reject(errors);
//     }

//     const pages = data.markdown.edges;
//     pages.forEach(({ node }) => {
//       const template = node.fields.slug.split('/')[1];

//       const templateFile = path.resolve(`./src/layouts/${template}.js`);

//       createPage({
//         path: node.fields.slug,
//         component: templateFile,
//         context: {
//           slug: node.fields.slug,
//         },
//       });
//     });
//   });

//   return Promise.all([markdown]);
// };
