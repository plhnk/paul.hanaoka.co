import React from 'react';
import { Global } from '@emotion/core';
import WorkSans from '../utilities/WorkSans-Roman-VF.ttf';

export default (props) => (
  <Global
    styles={{
      '@font-face': {
        fontFamily: 'Work Sans Var',
        src: `url(${WorkSans}) format('truetype')`,
        fontWeight: '100 900',
      },
    }}
  />
);
