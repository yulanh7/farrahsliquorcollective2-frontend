import Layout from "../src/components/layout";
import React, { useState, FormEvent } from "react";
import utilStyles from "../src/styles/utils.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Post() {
  const [email, setEmail] = useState("");
  const [optOut, setOptOut] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { email?: string } = {};
    if (email.trim() === "") {
      newErrors.email = "Email is required"
      isValid = false;
    } else if (!isValidEmail(email)) {

      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (validateForm()) {
      // Form is valid, perform form submission logic here
      setOptOut(true);
    }

  }

  return (
    <Layout title="OPT OUT" logo="/images/logo.jpg">
      {
        optOut ? (
          <div>
            <div className={`${utilStyles.textCenter} ${utilStyles.pB50px}`}>
              You have been unsubscribed
            </div>
            <div className={`${utilStyles.textCenter}`}>
              <Link href="/" >
                <Button variant="primary" type="submit" className={utilStyles.button}>
                  OPT IN
                </Button>
              </Link>
            </div>
          </div>
        ) : (

          <form className={utilStyles.flexTop} onSubmit={handleSubmit}>
            <div className={`${utilStyles.pR5px} ${utilStyles.pB10px}`}>

              <input
                type="email"
                placeholder="Email"
                value={email}
                width="300px"
                className={`form-control ${errors.email && 'is-invalid'}`}
                onChange={(e) => { setEmail(e.target.value) }}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
            <Button variant="primary" type="submit" className={utilStyles.button}>
              UNSUBSCRIBE
            </Button>
          </form>
        )
      }
    </Layout >
  );
}
