/** @jsx jsx */

import { jsx } from 'theme-ui';
import PropTypes from 'prop-types';
import IconsObject from '../utilities/icons';

const Icon = ({ name, ...props }) => {
  
  const DynamicIcon = IconsObject[name];

  if (!DynamicIcon) {
    console.log(`${name} icon not found`);
  }

  return DynamicIcon ? (
    <DynamicIcon height='100%' fill='currentColor' width='100%' name={name} {...props} />
  ) : (
    <span />
  );
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Icon;
