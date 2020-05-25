import React from 'react';
import PropTypes from "prop-types"

const Icon = props => {
  const styles = {
    svg: {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    path: {
      fill: props.color,
    },
  };

  return (
    <svg
      id={`${props.id}`}
      class={`${props.class}`}
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
  class: PropTypes.string,
  label: PropTypes.string,
};

Icon.defaultProps = {
  size: 40,
  color: 'var(--lighter)',
  label: 'icon',
};

export default Icon;