import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html className="bg-gray-400">
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://awesomecdn.netlify.app/tw.js"></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
