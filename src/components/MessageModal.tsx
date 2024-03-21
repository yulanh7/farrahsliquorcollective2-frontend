// components/MessageModal.tsx

import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { sendMessageSlice, toggleModal } from "../../store/userSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { Button, Form } from "react-bootstrap";
import utilStyles from "../styles/utils.module.scss";

interface MessageModalProps {
  show: boolean;
  onHide: () => void;
  forClient: boolean
}

const MessageModal: React.FC<MessageModalProps> = ({ show, onHide, forClient }) => {
  const dispatch = useAppDispatch();
  const { showModal } = useSelector((state: RootState) => state.user);

  const [isVisible, setIsVisible] = useState(show);
  const [isForClient, setIsForClient] = useState(true);
  const [message, setMessage] = useState(''); // State to hold the textarea value
  const [error, setError] = useState('');

  // Update visibility state when the show prop changes
  useEffect(() => {
    setIsForClient(forClient);
  }, [show, forClient]);

  const toggleVisibility = () => {
    dispatch(toggleModal({ showModal: true }));

  };


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the admin and message to see if everything is captured correctly
    if (message.trim() === '') {
      // Set an error message if the message is empty
      setError('Please enter a message before sending.');
      return;
    }

    const payload = {
      message, // Include the message in the payload
    };
    dispatch(sendMessageSlice(payload));
    dispatch(toggleModal({ showModal: false }));
    setMessage(''); // Optionally clear the message after sending
  };

  // Function to update state with the textarea's current value
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  console.log(isForClient);
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
