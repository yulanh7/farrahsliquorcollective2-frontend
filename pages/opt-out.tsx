import Layout from "../src/components/layout";
import React, { useState, FormEvent, ChangeEvent } from "react";
import utilStyles from "../src/styles/utils.module.scss";
import { Button } from "react-bootstrap";
import Link from "next/link";

export default function Post() {
  const [optOutSelection, setOptOutSelection] = useState('optOutFromOffer');
  const handleOptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setOptOutSelection(e.target.value);
  };
  const [email, setEmail] = useState("");
  const [optOut, setOptOut] = useState(false);
  const [errors, setErrors] = useState<{
    email?: string;
    optOutSelection?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { email?: string, optOutSelection?: string } = {};
    // Form validation
    if (!optOutSelection) {
      newErrors.optOutSelection = "Please select an option to opt out."
      isValid = false;
    }
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
    <Layout title="OPT OUT" logo="/images/logo.jpg" topSubTitle="Unsubscribe">
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

          <form onSubmit={handleSubmit} className={utilStyles.flexColCenter}>
            <div className={`${utilStyles.flexColStart} ${utilStyles.pB20px}`}>
              <label className="customRadio">
                <input
                  type="radio"
                  name="optOut"
                  value="optOutFromOffer"
                  checked={optOutSelection === 'optOutFromOffer'}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span> {/* Pseudo-element for the custom checkbox appearance */}
                Opt out from this offer
              </label>
              <label className="customRadio">

                <input
                  type="radio"
                  name="optOut"
                  value="optOutFromFLC"
                  checked={optOutSelection === 'optOutFromFLC'}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span> {/* Pseudo-element for the custom checkbox appearance */}
                Opt out of {`Farrah's`} Liquor Collective
              </label>
              <label className="customRadio">

                <input
                  type="radio"
                  name="optOut"
                  value="optOutFrom4block"
                  checked={optOutSelection === 'optOutFrom4block'}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span> {/* Pseudo-element for the custom checkbox appearance */}
                Opt out of 4Block altogether
              </label>
              <label className="customRadio">

                <input
                  type="radio"
                  name="optOut"
                  value="optOutFromAll"
                  checked={optOutSelection === 'optOutFromAll'}
                  onChange={handleOptionChange}
                />
                <span className="checkmark"></span> {/* Pseudo-element for the custom checkbox appearance */}
                Opt out and not hear from us again
              </label>
              <div className={`${errors.optOutSelection && 'is-invalid'}`}></div>
              {errors.optOutSelection && (
                <div className="invalid-feedback">{errors.optOutSelection}</div>
              )}
            </div>
            <div className={utilStyles.flexTop}>
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
            </div>

          </form>
        )
      }
    </Layout >
  );
}
