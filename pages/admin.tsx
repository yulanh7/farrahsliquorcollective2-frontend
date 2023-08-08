import React, { useState, useEffect } from 'react';
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import { addCouponSlice, addDefaultCouponSlice } from '../store/couponSlice';
import { RootState, useAppDispatch } from '../store';
import { useRouter } from 'next/router';
import { fetchDefaultCouponSlice } from '../store/couponSlice';
import { useSelector } from 'react-redux';

export default function Post() {
  const newUrl = "/offer-receipt";
  const router = useRouter();
  const { defaultCoupon, defaultCouponLoading } = useSelector((state: RootState) => state.coupon);
  const dispatch = useAppDispatch();

  const [coupons, setCoupons] = useState([]); // Assume this array holds coupon data
  const [editingCouponId, setEditingCouponId] = useState(null);
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedExpireDate, setUpdatedExpireDate] = useState('');
  const [updatedScheduleTime, setUpdatedScheduleTime] = useState('');

  useEffect(() => {

    dispatch(fetchDefaultCouponSlice());
  }, [dispatch]);

  // ... other code

  const handleEditClick = (couponId) => {
    setEditingCouponId(couponId);
    const editedCoupon = coupons.find(coupon => coupon.id === couponId);
    setUpdatedDescription(editedCoupon.description);
    setUpdatedExpireDate(editedCoupon.expireDate);
    setUpdatedScheduleTime(editedCoupon.scheduleTime);
  };

  const handleSaveClick = (couponId) => {
    const updatedCoupons = coupons.map(coupon => {
      if (coupon.id === couponId) {
        return {
          ...coupon,
          description: updatedDescription,
          expireDate: updatedExpireDate,
          scheduleTime: updatedScheduleTime,
        };
      }
      return coupon;
    });
    setCoupons(updatedCoupons);
    setEditingCouponId(null);
  };

  // ... other code

  return (
    <Layout title="Coupon Manager" logo="/images/logo.jpg" subTitle="Private details; Private" showFeedback showABN>
      <h3>Coupon List</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Expire Date</th>
            <th>Schedule Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon.id}>
              <td>{coupon.id}</td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="text"
                    value={updatedDescription}
                    onChange={(e) => setUpdatedDescription(e.target.value)}
                  />
                ) : (
                  coupon.description
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="date"
                    value={updatedExpireDate}
                    onChange={(e) => setUpdatedExpireDate(e.target.value)}
                  />
                ) : (
                  coupon.expireDate
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <input
                    type="time"
                    value={updatedScheduleTime}
                    onChange={(e) => setUpdatedScheduleTime(e.target.value)}
                  />
                ) : (
                  coupon.scheduleTime
                )}
              </td>
              <td>
                {editingCouponId === coupon.id ? (
                  <>
                    <Button variant="success" onClick={() => handleSaveClick(coupon.id)}>Save</Button>{' '}
                    <Button variant="secondary" onClick={() => setEditingCouponId(null)}>Cancel</Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditClick(coupon.id)}>Edit</Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  );
}
