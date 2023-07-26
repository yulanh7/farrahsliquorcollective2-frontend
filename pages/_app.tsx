import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import "../src/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import store from '../store';
import { run } from '../lib/notification'; // Import the run function from the notification.ts file


const MyApp = ({ Component, pageProps }: AppProps) => {
  // useEffect(() => {
  //   run(); // Call the run function to register the service worker and set up push notifications
  // }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;