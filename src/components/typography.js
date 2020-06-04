import React from 'react';
import { Global } from '@emotion/core';

import AvenirBlack from '../utilities/fonts/avenir/Avenir-Black-03.ttf';

export default (props) => (
    <Global
      styles={{
        '@font-face': {
          fontFamily: 'Avenir Black',
          src: `url(${AvenirBlack}) format('truetype')`,
          fontWeight: '900',
        },
      }}
    />
);
