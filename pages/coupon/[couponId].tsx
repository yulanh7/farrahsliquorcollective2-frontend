// pages/[couponId].tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchCouponSlice, redeemCouponSlice } from "../../store/couponSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import CouponComponent from '../../src/components/couponComponent';
import Layout from "../../src/components/layout";


const CouponPage = () => {
  const router = useRouter();
  const couponId = Array.isArray(router.query.couponId) ? router.query.couponId[0] : router.query.couponId;
  const dispatch = useAppDispatch();
  const { coupon, couponLoading } = useSelector((state: RootState) => state.coupon);

  useEffect(() => {
    if (couponId) {
      dispatch(fetchCouponSlice({ _id: couponId }));
    }
  }, []);


  return (
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showABN>
      <CouponComponent coupon={coupon} loading={couponLoading} />
    </Layout>
  )
}

export default CouponPage;
