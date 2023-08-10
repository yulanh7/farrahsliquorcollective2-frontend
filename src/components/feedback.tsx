import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { sendFeedbackSlice } from "../../store/userSlice";
import { useAppDispatch } from "../../store";
import ReCAPTCHA from 'react-google-recaptcha';
import utilStyles from "../styles/utils.module.scss";

interface FeedbackFormProps {
  show: boolean;
  onHide: () => void;
}

export default function FeedbackForm({ show, onHide }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [errors, setErrors] = useState<{
    feedback?: string;
    isRecaptchaVerified?: string;
  }>({});

  const dispatch = useAppDispatch();


  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      feedback?: string;
      isRecaptchaVerified?: string;
    } = {};

    if (feedback.trim() === '') {
      newErrors.feedback = 'Feedback is required';
      isValid = false;
    }

    if (!isRecaptchaVerified) {
      newErrors.isRecaptchaVerified = 'Please verify reCAPTCHA before submitting.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

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
    if (validateForm()) {
      // Process the form submission
      dispatch(sendFeedbackSlice({ feedback }))
      // Close the modal
      onHide();
    }

  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Provide Feedback</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={utilStyles.mB20px}>
          <textarea
            className={`form-control ${errors.feedback && 'is-invalid'}`}
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={handleFeedbackChange}
            rows={5}
          />
          {errors.feedback && <div className="invalid-feedback">{errors.feedback}</div>}
        </div>

        <ReCAPTCHA
          sitekey="6Le0ZpQnAAAAAOeIgiopQ3gPTwtVUR5mSmbQuPoz"
          onChange={handleRecaptchaChange}
          className={`form-control ${errors.isRecaptchaVerified && 'is-invalid'}`}

        />
        {errors.isRecaptchaVerified && <div className="invalid-feedback">{errors.isRecaptchaVerified}</div>}

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
