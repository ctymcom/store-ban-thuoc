import Document, { Html, Head, Main, NextScript } from 'next/document'

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
              
          <div id="fb-root"></div>
          <div
            class="fb-customerchat"
            language="vi" themeColor="#42B54A" pageId="102164275124516"
          ></div>

        </body>
      </Html>
    )
  }
}

export default MyDocument