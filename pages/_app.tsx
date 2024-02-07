import { AppProps } from "next/app";
import React from "react";
import "../public/css/styles.css";

function HomePage({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default HomePage;
