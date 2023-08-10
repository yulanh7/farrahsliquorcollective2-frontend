import React, { useState, useEffect } from 'react';
import Layout from "../src/components/layout";
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../store';
import { fetchDefaultCouponSlice } from '../store/couponSlice';

import WalletTable from '../src/components/walletTable';

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

export default function MyWallet() {

  const dispatch = useAppDispatch();
  const { defaultCoupon, defaultCouponLoading } = useSelector((state: RootState) => state.coupon);


  useEffect(() => {
    dispatch(fetchDefaultCouponSlice());
  }, [dispatch]);




  return (
    <Layout title="My Wallet" logo="/images/logo.jpg" showFeedback>

      {allCoupons && allCoupons.length &&
        <WalletTable allCoupons={allCoupons} />
      }
    </Layout>
  );
}