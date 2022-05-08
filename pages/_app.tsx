import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { SnackbarProvider } from "notistack";
import RefreshDataContext from "../src/refreshDataContext";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [refresh, setRefresh] = React.useState(false);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
          <RefreshDataContext.Provider value={{ refresh, setRefresh }}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />{" "}
          </RefreshDataContext.Provider>
        </ThemeProvider>{" "}
      </SnackbarProvider>
    </CacheProvider>
  );
}
