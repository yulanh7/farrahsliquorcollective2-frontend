import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { useRouter } from "next/router";
import { Button, Container, Row, Col } from "react-bootstrap";
import Badge from "../src/components/badge";
import { useState } from 'react';


export default function Post() {
  const router = useRouter();
  // const referra = router.query.referra;
  console.log(router.query);
  const newUrl = "/offer-receipt";

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    dob?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      dob?: string;
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

    setErrors(newErrors);
    return isValid;
  };

  const isValidEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      const hashCode = getHash(firstName, lastName, email, dob);
      console.log(hashCode);
      getHash(firstName, lastName, email, dob).then(hash => {
        console.log(hash);
        fetch('http://172.19.0.191:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ hash })
        });
      });
      // Form is valid, perform form submission logic here
      router.push(newUrl)
    }
  };

  const getHash = async (firstName, lastName, email, dob) => {
    const data = `${firstName}${lastName}${email}${dob}`;
    const encoder = new TextEncoder();
    const encodedData = encoder.encode(data);
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', encodedData);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }


  return (
    <Layout title="YOUR DETAILS (SECURELY)" logo="/images/logo.jpg">
      <Badge />
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
              <div className={utilStyles.pB10px}>
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
            </Col>
            <Col sm="12" md="6" className={utilStyles.rightCol}>
              <h2 className={`${utilStyles.headingMd} ${utilStyles.pB10px}`}>
                OPT IN OFFER TO REGISTRAR
              </h2>
              <div className={`${utilStyles.text} ${utilStyles.pB10px}`}>
                Lorem ipsum is placeholder text commonly used in the graphic,
                print, and publishing industries for previewing layouts and
                visual mockups.
              </div>


              <Button
                variant="primary"
                type="submit"
                className={utilStyles.button}
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Container>
      </form>
    </Layout>
  );
}
