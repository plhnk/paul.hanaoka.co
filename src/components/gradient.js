/** @jsx jsx */

import { jsx } from 'theme-ui';

const Gradient = ({ to, ...props }) => {
  const directionMap = {
    top: {
      x1: '0',
      y1: '0',
      x2: '0',
      y2: '1',
    },
    bottom: {
      x1: '0',
      y1: '1',
      x2: '0',
      y2: '0',
    },
    left: {
      x1: '1',
      y1: '0',
      x2: '0',
      y2: '0',
    },
    right: {
      x1: '1',
      y1: '0',
      x2: '1',
      y2: '0',
    },
  };

  return (
    console.log(directionMap[to.x2], 'prop passed in'),
    (
      <svg
        width="100%"
        height="100%"
        sx={{pointerEvents:'none',}}
        {...props}
      >
        <defs>
          {/* thanks to https://larsenwork.com/easing-gradients/ */}
          <linearGradient id="gradient" {...directionMap[to]}>
            <stop offset="0" stopColor="white" stopOpacity="0" />
            <stop offset="24%" stopColor="white" stopOpacity="8%" />
            <stop offset="50%" stopColor="white" stopOpacity="36%" />
            <stop offset="98%" stopColor="white" stopOpacity="92%" />
            <stop offset="1" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="gradient-mask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#gradient)"
            />
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          mask="url(#gradient-mask)"
        />
      </svg>
    )
  );
};

export default Gradient;
