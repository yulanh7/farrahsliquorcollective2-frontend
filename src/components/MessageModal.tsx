import React, { useState, useEffect } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { getAdminInfoSlice } from "../../store/userSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

const MessageModal: React.FC = () => {
  const { admin } = useSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAdminInfoSlice());
  }, [dispatch]);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(admin);
  }
  return (
    <>
      <button onClick={toggleVisibility} style={{ position: 'fixed', right: 20, bottom: 20 }}>
        <FiMessageSquare size={24} />
      </button>
      {isVisible && (
        <div style={{
          position: 'fixed',
          right: 20,
          bottom: 60,
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
        }}>
          {/* Your form goes here. Example: */}
          <form onSubmit={handleSubmit}>
            <div>
              <textarea placeholder="Your message"></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      )}
    </>
  );
};

export default MessageModal;
