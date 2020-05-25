export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: '#171617',
    background: '#ffffff',
    primary: '#00b5ff',
    secondary: '#2b323a',
    muted: '#4d5868',
    highlight: 'red', // '#ffffcc',
    gray: 'grey',
    accent: 'green',
    darken: 'rgba(0, 0, 0, .25)',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#171617',
        primary: '#ff0000',
        secondary: 'orange',
        muted: 'purple',
        highlight: 'red',
        gray: 'grey',
        accent: 'green',
      },
    },
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64],
  fontWeights: {
    body: 400,
    heading: 900,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.1,
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  breakpoints: ['40em', '56em', '64em'],
  styles: {
    root: {
      margin: 0,
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
  },
};
