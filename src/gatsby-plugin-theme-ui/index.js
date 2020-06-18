export default {
  useColorSchemeMediaQuery: true, // set color mode based on user's settings
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  sizes: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  colors: {
    text: '#171617',
    neutral1: '#333333',
    neutral2: '#4D4D4D',
    neutral3: '#666666',
    neutral4: '#808080',
    neutral5: '#999999',
    neutral6: '#B3B3B3',
    neutral7: '#CCCCCC',
    neutral8: '#E6E6E6',
    neutral9: '#FFFFFF',
    background: '#F2F2F2',
    primary: '#0b5fff',
    secondary: '#2b323a',
    highlight: 'red', // '#ffffcc',
    gray: 'grey',
    accent: 'yellow',
    white: 'white',
    darken: 'rgba(0, 0, 0, .25)',
    modes: {
      dark: {
        text: '#ffffff',
        neutral1: '#F2F2F2',
        neutral2: '#E6E6E6',
        neutral3: '#CCCCCC',
        neutral4: '#B3B3B3',
        neutral6: '#808080',
        neutral7: '#666666',
        neutral8: '#4D4D4D',
        neutral9: '#333333',
        background: '#171617',
        primary: '#ff0000',
        secondary: 'orange',
      },
    },
  },
  fonts: {
    body: 'Athelas, Courier, serif',
    heading: 'Avenir Black, system-ui, sans-serif',
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
    heading: 1.1,
  },
  buttons: {
    icon: {
      padding: 1,
      margin: 1,
      color: 'text',
      size: 4,
      transition: 'transform .2s ease-in-out',
      '&:hover':{
        color: 'primary',
        transform: 'translateY(-0.2em)',
        transition: 'transform .2s ease-in-out',
      },
    },
  },
  links: {
    text: {
      color: 'inherit',
      variant: 'states',
    },
    nav: {
      fontSize: 3,
      mt:'0.2em',
    }
  },
  states: {
    '&:hover': {
      color: 'primary',
    },
    '&:focus': {
      outlineColor: 'primary',
      color: 'text',
    },
  },
  letterSpacings: {
    body: 'normal',
    caps: '0.2em',
  },
  text: {
    body: {
      fontFamily: 'body',
      fontSize: 3,

    },
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
      letterSpacing: '0.04em',
    },
  },
  breakpoints: ['40em', '56em', '64em'],
  zIndices: [-99, -1, 0, 1, 99, 999],
  styles: {
    root: {
      margin: 0,
      fontFamily: 'body',
      lineHeight: 'body',
      fontWeight: 'body',
    },
    h1: {
      variant: 'text.heading',
      fontSize: [6, null, 7],
      color: 'neutral8',
      m: 0,
      mt: [2, 1, 0],
      mb: [3, null, 4],
    },
    h2: {
      variant: 'text.heading',
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
    },
    a: {
      variant: 'links.text',
    },
    italic: {
      variant: 'text.italic',
    },
    p: {
      variant:'text.body',
    }
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
  layout: {
    sidebar: {
      background: 'primary', // trying to figure out how to switch the gradient background TODO
    },
  },
};
