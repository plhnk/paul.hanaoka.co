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
    gradient:
      'linear-gradient(to bottom,hsla(0, 0%, 100%, 0) 0%,hsla(0, 0%, 100%, 0.013) 8.1%,hsla(0, 0%, 100%, 0.049) 15.5%,hsla(0, 0%, 100%, 0.104) 22.5%,hsla(0, 0%, 100%, 0.175) 29%,hsla(0, 0%, 100%, 0.259) 35.3%,hsla(0, 0%, 100%, 0.352) 41.2%,hsla(0, 0%, 100%, 0.45) 47.1%,hsla(0, 0%, 100%, 0.55) 52.9%,hsla(0, 0%, 100%, 0.648) 58.8%,hsla(0, 0%, 100%, 0.741) 64.7%,hsla(0, 0%, 100%, 0.825) 71%,hsla(0, 0%, 100%, 0.896) 77.5%,hsla(0, 0%, 100%, 0.951) 84.5%,hsla(0, 0%, 100%, 0.987) 91.9%,hsl(0, 0%, 100%) 100%)',
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
        gradient:
          'linear-gradient(to bottom,hsla(300, 2%, 9%, 0) 0%,hsla(300, 2%, 9%, 0.013) 8.1%,hsla(300, 2%, 9%, 0.049) 15.5%,hsla(300, 2%, 9%, 0.104) 22.5%,hsla(300, 2%, 9%, 0.175) 29%,hsla(300, 2%, 9%, 0.259) 35.3%,hsla(300, 2%, 9%, 0.352) 41.2%,hsla(300, 2%, 9%, 0.45) 47.1%,hsla(300, 2%, 9%, 0.55) 52.9%,hsla(300, 2%, 9%, 0.648) 58.8%,hsla(300, 2%, 9%, 0.741) 64.7%,hsla(300, 2%, 9%, 0.825) 71%,hsla(300, 2%, 9%, 0.896) 77.5%,hsla(300, 2%, 9%, 0.951) 84.5%,hsla(300, 2%, 9%, 0.987) 91.9%,hsl(300, 2%, 9%) 100%)',
      },
    },
  },
  fonts: {
    body: 'Work Sans Var, system-ui, sans-serif',
    heading: 'Work Sans Var',
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
  text: {
     caps: {
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
    heading: {
      fontFamily: 'red',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
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
