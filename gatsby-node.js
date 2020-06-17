const { createFilePath } = require('gatsby-source-filesystem');

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  // you only want to operate on `Mdx` nodes for now. 
  if (node.internal.type === 'Mdx') {
    const value = createFilePath({ node, getNode });

    createNodeField({
      // Name of the field you are adding
      name: 'slug',
      // Individual MDX node
      node,
      // use filename as slug
      value: `${value}`,
    });
  }
};

const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }) => {
  // Destructure the createPage function from the actions object
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allMdx {
        edges {
          node {
            id
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild('🚨  ERROR: Loading "createPages" query');
  }

  // Create blog post pages.
  const posts = result.data.allMdx.edges;

  // you'll call `createPage` for each result
  posts.forEach(({ node }, index) => {
    createPage({
      // This is the slug craeted above
      path: node.fields.slug,
      // This component will wrap our MDX content
      component: path.resolve(`./src/layouts/posts.js`),
      // You can use the values in this context in
      // our page layout component
      context: { id: node.id },
    });
  });
};