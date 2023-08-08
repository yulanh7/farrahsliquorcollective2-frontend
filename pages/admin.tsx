import React, { useState } from 'react';
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { Button, Container, Row, Col } from "react-bootstrap";
import { addCouponSlice } from '../store/couponSlice';
import { RootState, useAppDispatch } from '../store';
import { useRouter } from 'next/router';

export default function Post() {
  // const referra = router.query.referra;
  const newUrl = "/offer-receipt";
  const router = useRouter();

  const dispatch = useAppDispatch();
  // const { userWithData, userInfo } = useSelector((state: RootState) => state.user);
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [errors, setErrors] = useState<{
    company?: string;
    description?: string;
    expireDate?: string;
    scheduleTime?: string;
  }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      company?: string;
      description?: string;
      expireDate?: string;
      scheduleTime?: string;

    } = {};
    if (company.trim() === '') {
      newErrors.company = 'Company name is required';
      isValid = false;
    }

    if (description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (expireDate.trim() === '') {
      newErrors.expireDate = 'Expire Date is required';
      isValid = false;
    }
    if (scheduleTime.trim() === '') {
      newErrors.scheduleTime = 'Schedule Time is required';
      isValid = false;
    }


    setErrors(newErrors);

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        company,
        description,
        expireDate,
        scheduleTime
      };
      console.log(payload);
      dispatch(addCouponSlice(payload))
    }
  };


  return (
    <Layout title="Coupon Manager" logo="/images/logo.jpg" subTitle="Private details; Private" showFeedback showABN>
      <h3>Add Coupon</h3>
      <form className={utilStyles.form} onSubmit={handleSubmit}>
        <div className={utilStyles.pB10px}>
          <label htmlFor="company" className="form-label">
            Company
          </label>
          <input
            type="text"
            className={`form-control ${errors.company && 'is-invalid'}`}
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {errors.company && (
            <div className="invalid-feedback">{errors.company}</div>
          )}
        </div>
        <div className={utilStyles.pB10px}>

          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className={`form-control ${errors.description && 'is-invalid'}`}
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {errors.description && (
            <div className="invalid-feedback">{errors.description}</div>
          )}
        </div>

        <div className={utilStyles.pB20px}>
          <label htmlFor="expireDate" className="form-label">
            Expire Date
          </label>
          <input
            type="date"
            className={`form-control ${errors.expireDate && 'is-invalid'}`}
            id="expireDate"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
            onFocus={(e) => e.target.type = "date"}
          />
          {errors.expireDate && <div className="invalid-feedback">{errors.expireDate}</div>}
        </div>
        <div className={utilStyles.pB20px}>
          <label htmlFor="scheduleTime" className="form-label">
            Schedule Time
          </label>
          <input
            type="date"
            className={`form-control ${errors.scheduleTime && 'is-invalid'}`}
            id="scheduleTime"
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            onFocus={(e) => e.target.type = "date"}
          />
          {errors.scheduleTime && <div className="invalid-feedback">{errors.scheduleTime}</div>}
        </div>

        <h5 className={`${utilStyles.pB10px}`}>
          OPT IN OFFER TO REGISTRAR
        </h5>
        <div className={`${utilStyles.text} ${utilStyles.pB10px}`}>
          Welcome to Farrah Liquor Collective members club. You will Receive{`<gift>`} for joining.
        </div>
        <Button
          variant="primary"
          type="submit"
          className={utilStyles.button}
        >
          Add Coupon
        </Button>

      </form>
    </Layout>
  );
}
