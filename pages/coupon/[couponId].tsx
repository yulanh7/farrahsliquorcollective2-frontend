// pages/[couponId].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCouponSlice, redeemCouponSlice } from "../../store/couponSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';


const CouponPage = ({ params }: { params: { couponId: string } }) => {
  const router = useRouter();
  const { redeem } = router.query; // Access query parameters directly
  const couponId = Array.isArray(router.query.couponId) ? router.query.couponId[0] : router.query.couponId;
  const dispatch = useAppDispatch();
  const { coupon, couponLoading } = useSelector((state: RootState) => state.coupon);

  useEffect(() => {
    if (coupon && redeem === 'true') {
      dispatch(redeemCouponSlice({ _id: coupon.id }));
    }
  }, [coupon, redeem, dispatch]);

  useEffect(() => {
    if (couponId) {
      dispatch(fetchCouponSlice({ _id: couponId }));
    }
  }, [couponId, dispatch]);


  const handleRedeemCoupon = async () => {
    const confirmDelete = window.confirm("Are you sure you want to redeem this coupon?");
    if (confirmDelete && couponId) {
      await dispatch(redeemCouponSlice({ _id: coupon.id }));
      dispatch(fetchCouponSlice({ _id: couponId }));
    }
  };

  return (
    <>
      {couponLoading &&
        <div>
          Loading
        </div>
      }
      {
        !couponLoading && coupon && (
          <div>
            <h1>Coupon Page</h1>
            <p>ID: {coupon.couponId}</p>
            <p>Description: {coupon.description}</p>
            <p>Expire Date: {coupon.expireDate}</p>

            {coupon.redeemed ? (
              <p>Coupon has been redeemed.</p>
            ) : (
              <div>
                <p>Coupon not redeemed.</p>
                <button onClick={handleRedeemCoupon}>Redeem</button>
              </div>
            )}
          </div>
        )
      }
    </>
  )
}

export default CouponPage;
