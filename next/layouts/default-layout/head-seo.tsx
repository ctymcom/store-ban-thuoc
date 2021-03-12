import React from "react";
import Head from "next/head";
export function HeadSEO() {
  return (
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=0"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Cabin:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
    </Head>
  );
}
