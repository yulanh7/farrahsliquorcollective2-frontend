// components/FAQ.tsx
import React from 'react';
import { Accordion } from 'react-bootstrap';
import utilStyles from "../styles/utils.module.scss";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqItems: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ faqItems }) => {
  return (
    <Accordion>
      {faqItems.map((item, index) => (
        <Accordion.Item eventKey={`${index}`} key={index}>
          <Accordion.Header className={utilStyles.textSm}> {item.question}</Accordion.Header>
          <Accordion.Body className={utilStyles.textSm}>
            {item.answer}
          </Accordion.Body>
        </Accordion.Item>
      ))}
    </Accordion>
  );
};

export default FAQ;
