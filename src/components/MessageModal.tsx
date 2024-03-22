// components/MessageModal.tsx

import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { sendMessageFromClientSlice, toggleModal, setIsForClient, sendMessageFromAdminSlice, fetchMessagesSlice } from "../../store/userSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import utilStyles from "../styles/utils.module.scss";
import NotificationAlertModule from "./notificationAlertModule";
import { run } from "../../lib/notification"; // Import the run function from the notification.ts file
import { v4 as uuidv4 } from 'uuid';

interface MessageModalProps {
  onHide: () => void;
  messageId?: string
}

const MessageModal: React.FC<MessageModalProps> = ({ onHide, messageId }) => {
  const dispatch = useAppDispatch();
  const { showModal, isForClient, messages } = useSelector((state: RootState) => state.user);
  const [message, setMessage] = useState(''); // State to hold the textarea value
  const [error, setError] = useState('');
  const [showNotificationModal, setShowNotificationModal] = useState(false);

  const toggleVisibility = () => {
    dispatch(toggleModal({ showModal: true }));
    dispatch(setIsForClient({ isForClient: true }));
    if (messageId) {
      dispatch(fetchMessagesSlice({ messageId }))
      localStorage.setItem('messageId', messageId);

    }

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
      const messageId = localStorage.getItem('messageId') || uuidv4(); // Generate a new one as fallback, should never really happen
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
          messageId,
          clientInfo: {
            endpoint: newSubscription?.endpoint || "default_endpoint_value",
            expirationTime: newSubscription?.expirationTime || null,
            keys: newSubscription?.keys || {},
          }
        };
        dispatch(sendMessageFromClientSlice(payload));
        dispatch(fetchMessagesSlice({ messageId }))

      }
      dispatch(toggleModal({ showModal: false }));
      setMessage('');

    } else {
      if (messageId) {
        const payload = {
          message,
          messageId: messageId,
          clientInfo: {
            endpoint: "default_endpoint_value",
            expirationTime: null,
            keys: {},
          }
        };
        dispatch(sendMessageFromAdminSlice(payload));
        dispatch(toggleModal({ showModal: false }));
        dispatch(fetchMessagesSlice({ messageId }))

        setMessage('');
      }
    }
  };

  // Function to update state with the textarea's current value
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  const handleCloseModal = () => {
    setShowNotificationModal(false);
  };

  console.log(messages)
  console.log(messageId)
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
          <h5 className={utilStyles.title}>
            <FiX size={24} className={utilStyles.closeIcon} onClick={onHide} />
            {isForClient ?
              "Your enquire" :
              " Reply to the client"
            }
          </h5>

          {/* {messageId && messageId} */}
          <div className={utilStyles.content}>

            <div className={utilStyles.history}>
              {isForClient && messages && (
                messages.map((item: any, index: number) => (
                  <div key={index} className={item.senderRole === "client" ? utilStyles.messageHistoryRight : utilStyles.messageHistoryLeft}>
                    {item.content}
                  </div>
                ))
              )}
              {!isForClient && messages && (
                messages.map((item: any, index: number) => (
                  <div key={index} className={item.senderRole === "client" ? utilStyles.messageHistoryLeft : utilStyles.messageHistoryRight}>
                    {item.content}
                  </div>
                ))
              )}
            </div>
            <Form onSubmit={handleSubmit} className={utilStyles.form} >

              {/* Bind the textarea value to state and listen for changes */}
              <textarea
                value={message}
                onChange={handleMessageChange}

              ></textarea>

              <Button variant="primary" type="submit" >Send</Button>
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </Form>
          </div>


        </div>
      )}
    </>
  );
};


export default MessageModal;
