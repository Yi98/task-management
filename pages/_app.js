import React from "react";
import Layout from "../components/layout/Layout";
import theme from "../src/theme";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { FeedbackContextProvider } from "../store/feedbackContext";
import { Provider } from "next-auth/client";

export default function MyApp({ Component, pageProps }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <Provider session={pageProps.session}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <FeedbackContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FeedbackContextProvider>
      </ThemeProvider>
    </Provider>
  );
}
