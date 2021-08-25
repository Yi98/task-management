import React from "react";
import Layout from "../components/layout/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../src/theme";
import "../styles/globals.css";
import { CssBaseline } from "@material-ui/core";
import { FeedbackContextProvider } from "../store/feedbackContext";

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <FeedbackContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FeedbackContextProvider>
    </ThemeProvider>
  );
}

export default MyApp;
