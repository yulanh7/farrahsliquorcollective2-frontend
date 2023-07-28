import React from 'react';
import { AppProps } from 'next/app';
import "../src/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Provider } from 'react-redux';
import store from '../store';


const MyApp = ({ Component, pageProps }: AppProps) => {

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;