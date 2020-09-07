import NextDocument, { Head, Html, Main, NextScript } from "next/document";
import React from "react";

import { css } from "~/helpers/stitches";

export default class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    try {
      let extractedStyles;
      ctx.renderPage = () => {
        const { styles, result } = css.getStyles(originalRenderPage);
        extractedStyles = styles;
        return result;
      };

      const initialProps = await NextDocument.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {extractedStyles.map((content, index) => (
              <style key={index}>{content}</style>
            ))}
          </>
        ),
      };
      // eslint-disable-next-line no-empty
    } finally {
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
