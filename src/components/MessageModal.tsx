import React, { useState, useEffect } from 'react';
import { FiMessageSquare, FiX } from 'react-icons/fi';
import { sendMessageSlice } from "../../store/userSlice";
import { useAppDispatch } from '../../store';

import { Button, Form } from "react-bootstrap";
import utilStyles from "../styles/utils.module.scss";


type AdminEntry = {
  endpoint?: string;
  expirationTime: number | null;
  keys: Record<string, string>;
};

const MessageModal: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(''); // State to hold the textarea value
  const [error, setError] = useState('');



  const toggleVisibility = () => setIsVisible(!isVisible);

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
    setMessage(''); // Optionally clear the message after sending
  };

  // Function to update state with the textarea's current value
  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
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
      {isVisible && (
        <div className={utilStyles.messageBox}>
          <FiX size={24} className={utilStyles.closeIcon} onClick={toggleVisibility} />
          <Form onSubmit={handleSubmit} className={utilStyles.form} >
            <div>
              {/* Bind the textarea value to state and listen for changes */}
              <textarea
                placeholder="Your message"
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
