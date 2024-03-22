import React, { useEffect, useState } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';  // Import the Head component
import "../src/styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import store from '../store';
import { RootState, useAppDispatch } from '../store';
import { Provider, useSelector } from 'react-redux';
import { toggleModal, setIsForClient } from "../store/userSlice";
import MessageModal from "../src/components/MessageModal";


interface AppWrapperProps {
  children: React.ReactNode;
}
function AppWrapper({ children }: AppWrapperProps) {
  const dispatch = useAppDispatch();
  const [messageId, setMessageId] = useState('');
  const hideModal = () => dispatch(toggleModal({ showModal: false, title: '', content: '' }));
  useEffect(() => {
    // Listen for messages from the service worker
    const channel = new BroadcastChannel('feedback-channel');
    channel.onmessage = (event) => {
      // When a message is received, check if it's for showing the modal
      if (event.data.action === 'show-reply-client-modal') {
        // Dispatch an action to toggle the modal
        dispatch(toggleModal({ showModal: true }));
        dispatch(setIsForClient({ isForClient: false }));
        setMessageId(event.data.messageId);

      } else {
        dispatch(toggleModal({ showModal: true }));
        dispatch(setIsForClient({ isForClient: true }));
        setMessageId(event.data.messageId);
      }
    };

    return () => {
      // Cleanup: Close the channel when the component unmounts
      channel.close();
    };
  }, [dispatch]);

  useEffect(() => {
    let localMessageId = localStorage.getItem('messageId');
    if (localMessageId) {
      setMessageId(localMessageId);
    }
  }, []);

  return <>
    <MessageModal onHide={hideModal} messageId={messageId} />

    {children}
  </>;
}

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
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </Provider>
  );
};

export default MyApp;