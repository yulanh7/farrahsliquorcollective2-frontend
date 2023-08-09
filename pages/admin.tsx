import React, { useState, useEffect } from 'react';
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { Button, Row, Col } from "react-bootstrap";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { addDefaultCouponSlice, fetchDefaultCouponSlice, updateDefaultCouponSlice } from '../store/couponSlice';
import { formatDateForInput } from "../utils/utils";
import CouponTable from '../src/components/couponTable';

const allCoupons = [
  {
    "_id": "1",
    "description": "50% off on shoes",
    "expireDate": "2023-08-31T00:00:00.000Z",
    "scheduleTime": "2023-08-31T00:00:00.000Z"
  },
  {
    "_id": "2",
    "description": "$10 off on orders over $50",
    "expireDate": "2023-08-31T00:00:00.000Z",
    "scheduleTime": "2023-08-31T00:00:00.000Z"
  }
]

export default function Post() {

  const dispatch = useAppDispatch();
  const { defaultCoupon, defaultCouponLoading } = useSelector((state: RootState) => state.coupon);

  const [description, setDescription] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [errors, setErrors] = useState<{
    company?: string;
    description?: string;
    expireDate?: string;
    scheduleTime?: string;
  }>({});

  useEffect(() => {
    dispatch(fetchDefaultCouponSlice());
  }, [dispatch]);

  useEffect(() => {
    if (defaultCoupon) {
      setDescription(defaultCoupon.description || '');
      setExpireDate(defaultCoupon.expireDate || '');
    }
  }, [defaultCoupon]);


  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      description?: string;
      expireDate?: string;
    } = {};

    if (description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (expireDate.trim() === '') {
      newErrors.expireDate = 'Expire Date is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        description,
        expireDate,
      };
      if (defaultCoupon) {
        dispatch(updateDefaultCouponSlice(payload));
      } else {
        dispatch(addDefaultCouponSlice(payload))
      }
    }
  };


  return (
    <Layout title="Coupon Manager" logo="/images/logo.jpg" showFeedback width="lg">
      {defaultCoupon ?
        <div className={utilStyles.pB20px}>
          <h4 className={`${utilStyles.textCenter} ${utilStyles.pB20px}`}>Default Coupon</h4>
          <form className={utilStyles.form} onSubmit={handleSubmit}>
            <Row>
              <Col sm="12" md="6" className={utilStyles.leftCol}>
                <div className={utilStyles.pB20px}>
                  <label htmlFor="expireDate" className="form-label">
                    Expire Date
                  </label>
                  <input
                    type="date"
                    className={`form-control ${errors.expireDate && 'is-invalid'}`}
                    id="expireDate"
                    value={formatDateForInput(expireDate)}
                    onChange={(e) => setExpireDate(e.target.value)}
                    onFocus={(e) => e.target.type = "date"}
                  />
                  {errors.expireDate && <div className="invalid-feedback">{errors.expireDate}</div>}
                </div>
              </Col>
              <Col sm="12" md="6" className={utilStyles.rightCol}>
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
              </Col>
            </Row>
            <div className={utilStyles.textCenter}>

              <Button
                variant="primary"
                type="submit"
                className={utilStyles.button}
              >
                UPDATE
              </Button>
            </div>
          </form>
        </div> :
        <div className={utilStyles.pB20px}>
          <div>
            <h4 className={utilStyles.textCenter}>Add Default Coupon</h4>
            <form className={utilStyles.form} onSubmit={handleSubmit}>
              <Row>
                <Col sm="12" md="6" className={utilStyles.leftCol}>
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
                </Col>
                <Col sm="12" md="6" className={utilStyles.rightCol}>
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
                </Col>
              </Row>
              <div className={utilStyles.textCenter}>

                <Button
                  variant="primary"
                  type="submit"
                  className={utilStyles.button}
                >
                  ADD
                </Button>
              </div>
            </form>
          </div>
        </div>
      }

      <h4 className={`${utilStyles.textCenter} ${utilStyles.pB20px}`}>All Coupons</h4>
      {allCoupons && allCoupons.length &&
        <CouponTable allCoupons={allCoupons} isForAdmin />
      }




    </Layout>
  );
}