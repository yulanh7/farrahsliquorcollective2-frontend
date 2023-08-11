import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'react-bootstrap';
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
  const [yourName, setYourName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState<{
    feedback?: string;
    yourName?: string;
    email?: string;
    isRecaptchaVerified?: string;
  }>({});

  const dispatch = useAppDispatch();

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      feedback?: string;
      yourName?: string;
      email?: string;
      isRecaptchaVerified?: string;
    } = {};

    if (feedback.trim() === '') {
      newErrors.feedback = 'Feedback is required';
      isValid = false;
    }
    if (yourName.trim() === '') {
      newErrors.yourName = 'Your Name is required';
      isValid = false;
    }
    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Email is invalid';
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
      const payload = {
        feedback,
        phone,
        email,
        name: yourName
      }
      dispatch(sendFeedbackSlice(payload))
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
        <Row>
          <Col sm="12" md="6" className={utilStyles.formLeftCol}>
            <div className={utilStyles.pB10px}>
              <input
                type="text"
                placeholder="Your Name"
                className={`form-control ${errors.yourName && 'is-invalid'}`}
                id="yourName"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
              {errors.yourName && (
                <div className="invalid-feedback">{errors.yourName}</div>
              )}
            </div>
          </Col>
          <Col sm="12" md="6" className={utilStyles.formRightCol}>
            <div className={utilStyles.pB10px}>
              <input
                type="phone"
                placeholder="Phone"
                className={`form-control`}
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <div className={utilStyles.pB10px}>
              <input
                type="email"
                placeholder="Email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>

          </Col>

        </Row>

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
