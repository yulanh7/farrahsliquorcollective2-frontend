import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

interface FeedbackFormProps {
  show: boolean;
  onHide: () => void;
}

export default function FeedbackForm({ show, onHide }: FeedbackFormProps) {
  const [feedback, setFeedback] = useState('');

  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = () => {
    // Handle feedback submission here
    // You can use an API call or dispatch a Redux action
    console.log('Feedback submitted:', feedback);

    // Close the modal
    onHide();
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
