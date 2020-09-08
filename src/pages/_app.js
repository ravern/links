import { css, Global } from "@emotion/core";
import { ThemeProvider } from "emotion-theming";
import Head from "next/head";

import { LIGHT_THEME } from "~/constants";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Links</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeProvider theme={LIGHT_THEME}>
        <Global styles={globalStyles} />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

const globalStyles = css`
  * {
    font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
    box-sizing: border-box;
  }

  :root {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  input,
  button {
    font-size: 1.6rem;
  }
`;
