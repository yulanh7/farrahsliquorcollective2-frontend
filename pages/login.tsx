import React, { useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import utilStyles from '../../src/styles/utils.module.scss'
import { loginSlice } from "../store/userSlice";
import { RootState, useAppDispatch } from '../store';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { hashPassword } from "../utils/utils";
import { useSelector } from 'react-redux';
import Layout from "../src/components/layout";
import { run } from "../lib/notification"; // Import the run function from the notification.ts file

type ActiveSection = 'login' | 'forgetPassword' | 'resetPassword';

interface LoginComponentProps {
  handleActiveSection?: (section: ActiveSection) => void;
  submitUserError: string | null;
  submitUserLoading: boolean
}

const LoginComponent: React.FC<LoginComponentProps> = ({ handleActiveSection }) => {
  const { submitUserError, submitUserLoading } = useSelector((state: RootState) => state.user);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    showPassword: false
  });

  const dispatch = useAppDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const notificationGranted = await run();
    if (notificationGranted == "notGranted") {

    } else {
      const subscription = JSON.stringify(notificationGranted);
      const newSubscription = JSON.parse(subscription);
      const hashedPassword = hashPassword(credentials.password);
      const payload = {
        username: credentials.username,
        password: credentials.password,
        endpoint: newSubscription?.endpoint || "default_endpoint_value",
        expirationTime: newSubscription?.expirationTime || null,
        keys: newSubscription?.keys || {},
      }
      dispatch(loginSlice(payload));
    }
  };


  return (
    <Layout title="Login" logo="/images/logo.jpg" showFeedback width="lg">
      <div className='login-container'>
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="username">
            <Form.Control
              type="text"
              placeholder="User"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <InputGroup>
              <Form.Control
                type={credentials.showPassword ? "text" : "password"}
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                required
              />
              <InputGroup.Text onClick={() => setCredentials(prev => ({ ...prev, showPassword: !prev.showPassword }))}>
                {credentials.showPassword ? <FaEyeSlash /> : <FaEye />}
              </InputGroup.Text>
            </InputGroup>
          </Form.Group>

          {submitUserError && <div className="error-message">{submitUserError}</div>}

          <div>
            <Button variant="primary" type="submit" disabled={submitUserLoading}>{submitUserLoading ? "Submitting..." : "Login"}</Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default LoginComponent;
