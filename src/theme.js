import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
let theme = createTheme({
  palette: {
    primary: {
      main: "#5F69EF",
    },
    secondary: {
      main: "#5F69EF",
    },
    error: {
      main: red.A400,
    },
    background: {
      main: "#FFF",
      dark: "#EBEFFF",
      light: "#F5F7FF",
      whiteDark: "#F4F4F4",
    },
    neutral: {},
  },
});

theme = responsiveFontSizes(theme);

export default theme;
