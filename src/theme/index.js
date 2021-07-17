import { createMuiTheme } from '@material-ui/core/styles';
import { themeOptions } from './default';
const theme = createMuiTheme({
  direction: 'rtl',
  ...themeOptions,
});
export default theme;
