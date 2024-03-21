// components/MessageModal.tsx

import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { sendMessageFromClientSlice, toggleModal, setIsForClient, sendMessageFromAdminSlice } from "../../store/userSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import utilStyles from "../styles/utils.module.scss";
import NotificationAlertModule from "./notificationAlertModule";
import { run } from "../../lib/notification"; // Import the run function from the notification.ts file

interface MessageModalProps {
  show: boolean;
  onHide: () => void;
  forClient: boolean
}

const MessageModal: React.FC<MessageModalProps> = ({ show, onHide, forClient }) => {
  const dispatch = useAppDispatch();
  const { showModal, isForClient } = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState(''); // State to hold the textarea value
  const [error, setError] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const toggleVisibility = () => {
    dispatch(toggleModal({ showModal: true }));
    dispatch(setIsForClient({ isForClient: true }));

  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the admin and message to see if everything is captured correctly
    if (message.trim() === '') {
      // Set an error message if the message is empty
      setError('Please enter a message before sending.');
      return;
    }


    if (isForClient) {
      const notificationGranted = await run();
      if (notificationGranted == "notGranted") {
        setShowNotificationModal(true);
      } else {
        const subscription = JSON.stringify(notificationGranted);
        const newSubscription = JSON.parse(subscription);
        if (subscription) {

        } else {
          alert("Please allow notification in this website ");
        }
        const payload = {
          message,
          userHash: "hash",
          endpoint: newSubscription?.endpoint || "default_endpoint_value",
          expirationTime: newSubscription?.expirationTime || null,
          keys: newSubscription?.keys || {},
        };
        dispatch(sendMessageFromClientSlice(payload));
      }


    } else {
      const payload = {
        message,
        userHash: 'your_user_hash_value_here', // Replace 'your_user_hash_value_here' with the actual user hash
        endpoint: "default_endpoint_value",
        expirationTime: null,
        keys: {},
      };
      dispatch(sendMessageFromAdminSlice(payload));
    }
    dispatch(toggleModal({ showModal: false }));
    setMessage('');
  };

  // Function to update state with the textarea's current value
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleCloseModal = () => {
    setShowNotificationModal(false);
  };
  return (
    <>
      <Button
        variant="primary"
        type="submit"
        className={utilStyles.messageButton}
        onClick={toggleVisibility} style={{ position: 'fixed', right: 20, bottom: 20 }}
      >
        <FiMessageSquare size={24} />

      </Button>
      <NotificationAlertModule show={showNotificationModal} onHide={handleCloseModal} />

      {showModal && (
        <div className={utilStyles.messageBox}>
          <FiX size={24} className={utilStyles.closeIcon} onClick={onHide} />
          {isForClient ?
            <p>Your enquire</p> :
            <p> Reply to the client</p>
          }
          <Form onSubmit={handleSubmit} className={utilStyles.form} >
            <div>
              {/* Bind the textarea value to state and listen for changes */}
              <textarea
                value={message}
                onChange={handleMessageChange}
                rows={4}
              ></textarea>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="primary" type="submit" >Send</Button>
          </Form>
        </div>
      )}
    </>
  );
};


export default MessageModal;
