// components/MessageModal.tsx

import React, { useState, useEffect, FormEvent } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import {
  sendMessageFromClientSlice,
  toggleModal,
  setIsForClient,
  sendMessageFromAdminSlice,
  fetchMessagesSlice,
  deleteMessageSlice
} from "../../store/userSlice";
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
    const localMessageId = localStorage.getItem('messageId');

    if (localMessageId) {
      dispatch(fetchMessagesSlice({ messageId: localMessageId }));
    }

  };


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // This is commonly needed in form submissions to prevent the default form submit action

    // Log the admin and message to see if everything is captured correctly
    if (message.trim() === '') {
      // Set an error message if the message is empty
      setError('Please enter a message before sending.');
      return;
    }
    if (isForClient) {
      const localMessageId = localStorage.getItem('messageId');

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
          messageId: localMessageId,
          clientInfo: {
            endpoint: newSubscription?.endpoint || "default_endpoint_value",
            expirationTime: newSubscription?.expirationTime || null,
            keys: newSubscription?.keys || {},
          }
        };
        dispatch(sendMessageFromClientSlice(payload));

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

  const handleDeleteMessage = () => {
    // Check if messageId is provided
    if (messageId) {
      // Display a confirmation dialog
      const isConfirmed = window.confirm('Are you sure you want to delete this message?');
      // Proceed with deletion if confirmed
      if (isConfirmed) {
        dispatch(deleteMessageSlice({ messageId }));
        onHide(); // Close the modal after deletion
      }
    }
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
          <h5 className={utilStyles.title}>
            <FiX size={24} className={utilStyles.closeIcon} onClick={onHide} />
            {isForClient ?
              "Your enquire" :
              " Reply to the client"
            }
          </h5>

          {/* {messageId && messageId} */}
          <div className={utilStyles.content}>
            {messages &&

              <div className={utilStyles.history}>
                {isForClient && (
                  messages.map((item: any, index: number) => (
                    <div key={index} className={item.senderRole === "client" ? utilStyles.messageHistoryRight : utilStyles.messageHistoryLeft}>
                      {item.content}
                    </div>
                  ))
                )}
                {!isForClient && (
                  messages.map((item: any, index: number) => (
                    <div key={index} className={item.senderRole === "client" ? utilStyles.messageHistoryLeft : utilStyles.messageHistoryRight}>
                      {item.content}
                    </div>
                  ))
                )}
              </div>
            }
            <Form className={utilStyles.form} >

              {/* Bind the textarea value to state and listen for changes */}
              <textarea
                value={message}
                onChange={handleMessageChange}

              ></textarea>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              {isForClient &&
                <Button variant="primary" type="submit" onClick={handleSubmit}>Send</Button>
              }
            </Form>
            {
              !isForClient &&
              <div className={utilStyles.action}>
                <Button className={utilStyles.finishBtn} onClick={handleDeleteMessage}>Finish</Button>
                <Button className={utilStyles.sendBtn} onClick={handleSubmit}>Send</Button>

              </div>
            }
          </div>


        </div>
      )}
    </>
  );
};


export default MessageModal;
