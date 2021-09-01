import React from "react";
import Layout from "../components/layout/Layout";
import theme from "../src/theme";
import "../styles/globals.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Provider } from "next-auth/client";
import { CategoryContextProvider } from "../store/category-context";
import { FeedbackContextProvider } from "../store/feedback-context";

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
          <CategoryContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
          </CategoryContextProvider>
        </FeedbackContextProvider>
      </ThemeProvider>
    </Provider>
  );
}
