export default {
  useColorSchemeMediaQuery: true, // set color mode based on user's settings
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: '#171617',
    background: '#ffffff',
    primary: '#0b5fff',
    secondary: '#2b323a',
    muted: '#4d5868',
    highlight: 'red', // '#ffffcc',
    gray: 'grey',
    accent: 'yellow',
    white: 'white',
    darken: 'rgba(0, 0, 0, .25)',
    modes: {
      dark: {
        text: '#ffffff',
        background: '#171617',
        primary: '#ff0000',
        secondary: 'orange',
      },
    },
  },
  fonts: {
    body: 'Athelas, Courier, serif',
    heading: 'Work Sans Var, system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [
    '.67rem',
    '.8rem',
    '1rem',
    '1.2rem',
    '1.5rem',
    '2rem',
    '3rem',
    '5rem',
    '20vmin',
  ],
  fontWeights: {
    body: 400,
    bold: 700,
    heading: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 0.9,
  },
  buttons: {
    icon: {
      padding: 1,
      margin: 1,
      color: 'text',
      size: 4,
    },
  },
  links: {
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
      fontFamily: 'heading',
      fontWeight: 'heading',
      lineHeight: 'heading',
    },
    display: {
      fontFamily: 'heading',
      fontWeight: 'heading',
      fontSize: 8,
      lineHeight: 'heading',
    },
    italic: {
      fontStyle: 'italic',
    },
  },
  breakpoints: ['40em', '56em', '64em'],
  styles: {
    root: {
      margin: 0,
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
      h1: {
        variant: 'text.heading',
        fontSize: [6, null, 7],
        color: 'primary',
        m: 0,
        mb: [3, null, 4],
      },
      img: {
        maxWidth: '100%',
        height: 'auto',
      },
    },
  },
  gradients: {
    transparentToBackground:
      'linear-gradient(to bottom,hsla(0, 0%, 100%, 0) 0%,hsla(0, 0%, 100%, 0.013) 8.1%,hsla(0, 0%, 100%, 0.049) 15.5%,hsla(0, 0%, 100%, 0.104) 22.5%,hsla(0, 0%, 100%, 0.175) 29%,hsla(0, 0%, 100%, 0.259) 35.3%,hsla(0, 0%, 100%, 0.352) 41.2%,hsla(0, 0%, 100%, 0.45) 47.1%,hsla(0, 0%, 100%, 0.55) 52.9%,hsla(0, 0%, 100%, 0.648) 58.8%,hsla(0, 0%, 100%, 0.741) 64.7%,hsla(0, 0%, 100%, 0.825) 71%,hsla(0, 0%, 100%, 0.896) 77.5%,hsla(0, 0%, 100%, 0.951) 84.5%,hsla(0, 0%, 100%, 0.987) 91.9%,hsl(0, 0%, 100%) 100%)',
    modes: {
      dark: {
        transparentToBackground:
          'linear-gradient(to bottom,hsla(300, 2%, 9%, 0) 0%,hsla(300, 2%, 9%, 0.013) 8.1%,hsla(300, 2%, 9%, 0.049) 15.5%,hsla(300, 2%, 9%, 0.104) 22.5%,hsla(300, 2%, 9%, 0.175) 29%,hsla(300, 2%, 9%, 0.259) 35.3%,hsla(300, 2%, 9%, 0.352) 41.2%,hsla(300, 2%, 9%, 0.45) 47.1%,hsla(300, 2%, 9%, 0.55) 52.9%,hsla(300, 2%, 9%, 0.648) 58.8%,hsla(300, 2%, 9%, 0.741) 64.7%,hsla(300, 2%, 9%, 0.825) 71%,hsla(300, 2%, 9%, 0.896) 77.5%,hsla(300, 2%, 9%, 0.951) 84.5%,hsla(300, 2%, 9%, 0.987) 91.9%,hsl(300, 2%, 9%) 100%)',
      },
    },
  },
};
