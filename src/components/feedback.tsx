import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { sendFeedbackSlice } from "../../store/userSlice";
import { useAppDispatch } from "../../store";
import ReCAPTCHA from 'react-google-recaptcha';

interface FeedbackFormProps {
  show: boolean;
  onHide: () => void;
}

export default function FeedbackForm({ show, onHide }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);

  const dispatch = useAppDispatch();

  const handleRecaptchaChange = (token: string | null) => {
    if (token) {
      setIsRecaptchaVerified(true);
    } else {
      setIsRecaptchaVerified(false);
    }
  };

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {

    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    if (isRecaptchaVerified) {
      // Process the form submission
      dispatch(sendFeedbackSlice({ feedback }))
      // Close the modal
      onHide();
    } else {
      alert('Please verify reCAPTCHA before submitting.');
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Provide Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
          rows={5}
        />
        <ReCAPTCHA
          sitekey="6Le0ZpQnAAAAAOeIgiopQ3gPTwtVUR5mSmbQuPoz"
          onChange={handleRecaptchaChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
