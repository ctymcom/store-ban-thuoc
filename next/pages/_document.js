import Document, { Html, Head, Main, NextScript } from 'next/document'

const isProduction = process.env.NODE_ENV === "production";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <div id="dialog-root"></div>
          <div id="popover-root"></div>
          {isProduction && (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-H8HTX7NFE1"></script>
              <script>
                {
                  `
                  if (typeof window !== 'undefined') {
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){window.dataLayer.push(arguments)}
                    gtag('js', new Date());
    
                    gtag('config', 'G-H8HTX7NFE1');
                  }
                  `
                }
              </script>
            </>
          )}
        </body>
      </Html>
    )
  }
}

export default MyDocument