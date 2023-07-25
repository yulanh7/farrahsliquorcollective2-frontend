import React, { useState, FormEvent } from "react";
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import QRCodeGenerator from "../utils/QRCodeUtils";
import Link from "next/link";

export default function Post() {
  const router = useRouter();
  // const uniqueId = router.query.uniqueId;
  console.log(router.query);
  const [uniqueId, setUniqueId] = useState("");
  const newUrl = uniqueId ? `/opt-out?uniqueId=${uniqueId}` : `/opt-out`;
  const [errors, setErrors] = useState<{
    uniqueId?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { uniqueId?: string } = {};
    if (uniqueId.trim() === "") {
      newErrors.uniqueId = "Unique ID is required"
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  }


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (validateForm()) {
      // Form is valid, perform form submission logic here
      router.push(newUrl)
    }

  }

  return (
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showOptOut showABN>
      <form onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col sm="12" md="6">
              <QRCodeGenerator url={newUrl} className="qrcode80" />
            </Col>
            <Col sm="12" md="6" className={`${utilStyles.pT30px}`}>
              <div className={`${utilStyles.headingMd} ${utilStyles.pB10px}`}>Unique ID:</div>
              <div> FLC-00001 </div>
            </Col>
          </Row>
        </Container>
        {/* <h3 className={`${utilStyles.textCenter} ${utilStyles.pT30px}`}>
          Detail of the Offer
        </h3> */}
        <div
          className={`${utilStyles.text} ${utilStyles.pB10px} ${utilStyles.textCenter} ${utilStyles.pT30px}`}
        >
          Lorem ipsum is placeholder text commonly used in the graphic, print, and
          publishing industries for previewing layouts and visual mockups. Lorem
          ipsum is placeholder text commonly used in the graphic, print, and
          publishing industries for previewing layouts and visual mockups.
        </div>
        <div className={utilStyles.textCenter}>
          <Button variant="primary" type="submit" className={utilStyles.button}>
            SUBMIT
          </Button>
        </div>
      </form>
    </Layout>
  );
}
