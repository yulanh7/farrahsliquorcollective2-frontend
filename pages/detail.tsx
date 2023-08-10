import React, { useEffect, useState } from 'react';
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { Button, Container, Row, Col } from "react-bootstrap";
import Badge from "../src/components/badge";
import { useSelector } from 'react-redux';
import { optInSlice, getUserInfoSlice } from '../store/userSlice';
import { RootState, useAppDispatch } from '../store';
import { run } from '../lib/notification'; // Import the run function from the notification.ts file
import { useRouter } from 'next/router';
import { getHash, getCookie } from "../utils/utils";
import NotificationAlertModule from "../src/components/notificationAlertModule";

export default function Post() {
  // const referra = router.query.referra;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const { userWithData, userInfo } = useSelector((state: RootState) => state.user);
  const [subscriptionData, setSubscriptionData] = useState<PushSubscriptionJSON | null | undefined>(null);
  const [userWithDataState, setUserWithDataState] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [hash, setHash] = useState('');
  const [agreedPromotion, setAgreedPromotion] = useState(false);
  const [agreedAge, setAgreedAge] = useState(false);
  const [agreedNotigications, setAgreedNotigications] = useState(false);
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
    agreedPromotion?: string;
    agreedAge?: string;
    agreedNotigications?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      dob?: string;
      agreedPromotion?: string;
      agreedAge?: string;
      agreedNotigications?: string;
    } = {};

    if (firstName.trim() === '') {
      newErrors.firstName = 'First name is required';
      isValid = false;
    }

    if (lastName.trim() === '') {
      newErrors.lastName = 'Last name is required';
      isValid = false;
    }

    if (email.trim() === '') {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }

    if (dob.trim() === '') {
      newErrors.dob = 'Date of birth is required';
      isValid = false;
    }
    if (!agreedPromotion) {
      newErrors.agreedPromotion = 'You must agree to receive promotional material before submitting the form.';
      isValid = false;
    }
    if (!agreedAge) {
      newErrors.agreedAge = 'You must be at least 18 years old.';
      isValid = false;
    }
    if (!agreedNotigications) {
      newErrors.agreedNotigications = 'You must agreen to allow to show notifications from this website.';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  // useEffect(() => {
  //   const setupPushNotification = async () => {
  //     const subscription = JSON.stringify(await run());
  //     setSubscriptionData(JSON.parse(subscription));
  //   };

  //   setupPushNotification();
  // }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    if (validateForm()) {
      const notificationGranted = await run();
      if (notificationGranted == "notGranted") {
        setShowModal(true);

      } else {

        const subscription = JSON.stringify(notificationGranted);
        const newSubscription = JSON.parse(subscription);
        setSubscriptionData(newSubscription);
        if (subscription) {
          const hash = await getHash(firstName, lastName, email, dob);
          setHash(hash);
          const payload = {
            userHash: hash,
            endpoint: newSubscription?.endpoint || "default_endpoint_value",
            expirationTime: newSubscription?.expirationTime || null,
            keys: newSubscription?.keys || {}
          };
          await dispatch(optInSlice(payload));
          document.cookie = `userHash=${hash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
          document.cookie = `subscription=${JSON.stringify(newSubscription)};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;

        } else {
          alert("Please allow notification in this website ")
        }
      }
    }
  };

  useEffect(() => {
    // Redirect to the new page only if the user is not null
    if (userWithData && userWithData.subscriptionStatus && subscriptionData) {
      document.cookie = `userHash=${userWithData.userHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
      router.push("/offer-receipt");
    }
  }, [userWithData, router, subscriptionData]);

  // useEffect(() => {

  //   // Redirect to the new page only if the user is not null
  //   if (userWithData && userWithData.userHash && userWithData.subscriptionStatus) {
  //     document.cookie = `userHash=${userWithData.userHash};expires=Fri, 31 Dec 9999 23:59:59 GMT;path=/`;
  //     router.push("/offer-receipt");
  //   }
  // }, [hash, userWithData, router]);

  // useEffect(() => {

  //   // Redirect to the new page only if the user is not null
  //   const hash = getCookie('userHash');
  //   if (hash) {
  //     const payload = {
  //       userHash: hash,
  //       endpoint: subscriptionData?.endpoint || "default_endpoint_value",
  //       expirationTime: subscriptionData?.expirationTime || null,
  //       keys: subscriptionData?.keys || {}
  //     };
  //     dispatch(getUserInfoSlice(payload));
  //   }
  // }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Layout title="YOUR DETAILS (SECURELY)" logo="/images/logo.jpg" subTitle="Private details; Private" showFeedback showABN>

      <NotificationAlertModule show={showModal} onHide={handleCloseModal} />
      <form className={utilStyles.form} onSubmit={handleSubmit}>
        <Container>
          <Row>
            <Col sm="12" md="6" className={utilStyles.leftCol}>
              <div className={utilStyles.pB10px}>
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.firstName && 'is-invalid'}`}
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className={utilStyles.pB10px}>

                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.lastName && 'is-invalid'}`}
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback">{errors.lastName}</div>
                )}
              </div>
              <div className={utilStyles.pB10px}>

                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className={`form-control ${errors.email && 'is-invalid'}`}
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className={utilStyles.pB20px}>
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className={`form-control ${errors.dob && 'is-invalid'}`}
                  id="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  onFocus={(e) => e.target.type = "date"}
                />
                {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
              </div>
              <div>
                <label className={`${errors.agreedPromotion && 'is-invalid'} ${errors.agreedPromotion && 'form-control'}`}>
                  <input
                    type="checkbox"
                    checked={agreedPromotion}
                    onChange={(e) => setAgreedPromotion(e.target.checked)}
                  />
                  <span> I agree to receive promotional material.</span>
                </label>
                {errors.agreedPromotion && <div className="invalid-feedback">{errors.agreedPromotion}</div>}
              </div>
              <div>
                <label className={`${errors.agreedAge && 'is-invalid'} ${errors.agreedAge && 'form-control'}`}>
                  <input
                    type="checkbox"
                    checked={agreedAge}
                    onChange={(e) => setAgreedAge(e.target.checked)}
                  />
                  <span>  It is an offence to supply alcohol to a person under the age of 18 years – penalties apply. A.C.T. Liquor Licence Number 14005716.</span>
                </label>
                {errors.agreedAge && <div className="invalid-feedback">{errors.agreedAge}</div>}
              </div>

            </Col>
            <Col sm="12" md="6" className={utilStyles.rightCol}>
              <h5 className={`${utilStyles.pB10px}`}>
                OPT IN OFFER TO REGISTRAR
              </h5>
              <div className={`${utilStyles.text} ${utilStyles.pB20px}`}>
                Welcome to Farrah Liquor Collective members club. You will Receive{`<gift>`} for joining.
              </div>
              <div>
                <label className={`${errors.agreedNotigications && 'is-invalid'} ${errors.agreedNotigications && 'form-control'}`}>
                  <input
                    type="checkbox"
                    checked={agreedNotigications}
                    onChange={(e) => setAgreedNotigications(e.target.checked)}
                  />
                  <span className={`${utilStyles.headingSm}`}> <span className={`${utilStyles.primaryColor}`}>Allow notifications</span> from Farrash Liquor Collectives</span>
                  <div className={utilStyles.pL15px}> Receive exclusive offers, discounts, and updates on our latest activities directly to your device. {`Don't`} miss out!
                  </div>
                </label>
                {errors.agreedNotigications && <div className="invalid-feedback">{errors.agreedNotigications}</div>}
              </div>
              <Button
                variant="primary"
                type="submit"
                className={utilStyles.button}
              >
                SUBMIT
              </Button>
              <Badge />
            </Col>
          </Row>
        </Container>
      </form>
    </Layout>
  );
}
