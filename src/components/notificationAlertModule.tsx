import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import utilStyles from "../styles/utils.module.scss";

interface NotificationAlertModuleProps {
  show: boolean;
  onHide: () => void;
}

export default function NotificationAlertModule({ show, onHide }: NotificationAlertModuleProps) {
  let alertText = "chrome://settings/content/notifications?search=notification";
  if (typeof window !== 'undefined') {
    const userAgent = window.navigator.userAgent;
    console.log(userAgent);
    if (userAgent.includes("Edg")) {
      alertText = "edge://settings/content/siteDetails?site=https://dev.farrahsliquorcollective2.com/";
    } else if (userAgent.includes("Chrome")) {
      alertText = "chrome://settings/content/notifications?search=notification";
    } else if (userAgent.includes("Firefox")) {
      alertText = "Firefox://settings/content/notifications?search=notification";
    } else if (userAgent.includes("Safari")) {
      alertText = "Safari:";
    } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
      alertText = "Opera://settings/content/notifications?search=notification";
    } else {
      alertText = "chrome://settings/content/notifications?search=notification";
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Grant permission for Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className={utilStyles.pB20px}>
          Copy the link below and allow notification this website
        </div>
        <div className={utilStyles.textSm}>

          {alertText}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
