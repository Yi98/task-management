import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#3F51B5",
    },
    secondary: {
      main: "#3F51B5",
    },
    error: {
      main: red.A400,
    },
    background: {
      main: "#FFF",
      dark: "#F7F7F7",
    },
    neutral: {},
  },
});

theme = responsiveFontSizes(theme);

export default theme;
