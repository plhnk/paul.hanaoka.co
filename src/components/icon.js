/** @jsx jsx */

import PropTypes from "prop-types"
import { jsx } from 'theme-ui'

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: 'currentColor',
    },
  };

  return (
    <svg
      sx={{
        color: 'accent',
      }}
      id={`${props.id}`}
      style={styles.svg}
      width={`${props.size}px`}
      height={`${props.size}px`}
      viewBox="0 0 48 48"
      aria-label={`${props.label}`}
    >
      <path
        style={styles.path}
        d={props.icon}
      ></path>
    </svg>
  );
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
};

Icon.defaultProps = {
  size: 40,
  label: 'icon',
};

export default Icon;