import { darken, lighten } from '@material-ui/core';
import { Fade } from '@material-ui/core';
import { fade } from '@material-ui/core';
import { ThemeOptions } from '@material-ui/core';

const themeOptions = {
  // palette: {
  //   primary: {
  //     light: fade('#d21e27', 0.05),
  //     main: '#d21e27',
  //     dark: darken('#d21e27', 0.125),
  //     contrastText: '#fff',
  //   },
  //   secondary: {
  //     light: lighten('#07142c', 0.125),
  //     main: '#07142c',
  //     dark: darken('#07142c', 0.125),
  //     contrastText: '#fff',
  //   },
  //   info: {
  //     light: fade('#1a879f', 0.1),
  //     main: '#359fb7',
  //     dark: '#1a879f',
  //     contrastText: '#fff',
  //   },
  //   grey: {
  //     100: '#f7f7f8',
  //     200: '#f3f4f5',
  //     300: '#ecedef',
  //     400: '#e7e8ea',
  //     500: '#e7e7e7',
  //     600: '#a0a3ad',
  //     700: '#7f838f',
  //     800: '#7a7a7a',
  //     900: '#14142B',
  //   },
  //   text: {
  //     primary: '#07142c',
  //     secondary: '#7f838f',
  //     disabled: '#a0a3ad',
  //     hint: '#565a64',
  //   },
  //   divider: '#ecedef',
  //   background: {
  //     paper: '#fff',
  //     default: '#f7f7f8',
  //   },
  //   common: {
  //     white: '#fff',
  //     black: '#07142c',
  //   },
  // },
  // shadows: [
  //   'none',
  //   '0px 4px 8px rgba(97, 97, 97, 0.14), 0px 8px 16px rgba(97, 97, 97, 0.14)',
  //   '0px 8px 18px rgba(0, 0, 0, 0.28)',
  //   '0px 18px 33px rgba(166, 94, 75, 0.35)',
  //   '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
  //   '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
  //   '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
  //   '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
  //   '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
  //   '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
  //   '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
  //   '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
  //   '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
  //   '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
  //   '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
  //   '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
  //   '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
  //   '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
  //   '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
  //   '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
  //   '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
  //   '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
  //   '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
  //   '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
  //   '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
  // ],

  typography: {
    htmlFontSize: 10,
    fontFamily: ['PelazioFont', 'Roboto', 'Helvetica', 'sans-serif'].join(', '),
    fontSize: 15,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 600,
    h1: {},
    h2: {},
    h3: {},
    h4: {},
    h5: {},
    h6: {},
    subtitle1: {},
    subtitle2: {},
    body1: {},
    body2: {},
    button: {},
    caption: {},
    overline: {},
  },
  shape: {
    borderRadius: 12,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSize: '62.5%',
        },
      },
    },
    MuiLink: {
      root: {
        '&:hover': {
          color: '#363739',
        },
      },
    },
    MuiOutlinedInput: {
      root: {},
    },
    MuiFormLabel: {
      root: {
        fontWeight: 500,
        '&$focused': {
          color: 'auto',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: '10px',
        paddingTop: '12px',
        paddingBottom: '12px',
      },
      sizeLarge: {
        paddingTop: '16px',
        paddingBottom: '16px',
      },
      sizeSmall: {
        paddingTop: '7px',
        paddingBottom: '7px',
      },
      outlined: {
        borderColor: '#ecedef',
      },
    },
    MuiTabs: {
      root: {
        overflow: 'visible',
      },
      scroller: {
        overflow: 'visible !important',
      },
    },
    MuiTooltip: {
      arrow: {
        color: '#07142c',
      },
      tooltip: {
        borderRadius: 4,
        backgroundColor: '#07142c',
      },
    },
    MuiStepLabel: {
      label: {
        color: '#565a64',
        fontWeight: 'normal',
        '&.MuiStepLabel-active': {
          color: '#1a879f',
          fontWeight: 'bold',
        },
        '&.MuiStepLabel-completed': {
          color: '#565a64',
          fontWeight: 'normal',
        },
      },
    },
    MuiTableContainer: {
      root: {
        '&.MuiPaper-root ': {
          boxShadow: 'unset',
          backgroundColor: 'transparent',
        },
      },
    },
    MuiTableHead: {
      root: {
        backgroundColor: '#f7f7f8',
        borderRadius: 12,
      },
    },
    MuiTableBody: {
      root: {
        backgroundColor: '#fff',
      },
    },
    MuiTableCell: {
      root: {
        padding: 22,
        borderBottomColor: '#f3f4f5',
      },
      head: {
        color: '#565a64',
        borderBottomWidth: 0,
        lineHeight: 0.73,
        '&:first-child': {
          borderBottomLeftRadius: 12,
        },
        '&:last-child': {
          borderBottomRightRadius: 12,
        },
      },
      body: {
        fontWeight: 600,
      },
    },
  },
  props: {
    MuiButton: {
      disableElevation: true,
      disableRipple: true,
      disableTouchRipple: true,
      disableFocusRipple: true,
    },
    MuiLink: {
      underline: 'none',
      variant: 'body1',
      color: 'inherit',
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
      fullWidth: true,
      variant: 'outlined',
    },
    MuiTooltip: {
      TransitionComponent: Fade,
    },
  },
};

export { themeOptions };
