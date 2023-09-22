import React from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';  // Import the Head component
import "../src/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import store from '../store';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      {/* Add the Head component with your links and meta tags */}
      <Head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Your App Name" />
        <link rel="apple-touch-icon" href="/images/4Block-192x192.png" />
        <meta name="theme-color" content="#288990" />
      </Head>

      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;