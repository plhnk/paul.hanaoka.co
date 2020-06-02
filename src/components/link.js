/** @jsx jsx */

import { jsx } from 'theme-ui'

import { Link as GatsbyLink } from 'gatsby';
import { Link as ThemeLink } from 'theme-ui';

// Since DOM elements <a> cannot receive activeClassName,
// destructure the prop here and pass it only to GatsbyLink
const Link = ({ children, to, activeClassName, ...props }) => {
  // Tailor the following test to your environment.
  // This example assumes that any internal link (intended for Gatsby)
  // will start with exactly one slash, and that anything else is external.
  const internal = /^\/(?!\/)/.test(to);

  // Use Gatsby Link for internal links, and <a> for others
  if (internal) {
    return (
      <GatsbyLink
        to={to}
        activeClassName="active"
        sx={{
          color: 'inherit',
          '&.active': {
            color: 'primary',
          },
        }}
        {...props}
      >
        {children}
      </GatsbyLink>
    );
  }
  return (
    <ThemeLink target="_blank" rel={'noopener noreferrer'} href={to} {...props}>
      {children}
    </ThemeLink>
  );
};

export default Link;
