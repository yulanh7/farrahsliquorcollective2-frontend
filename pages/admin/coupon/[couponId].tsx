// pages/[couponId].tsx

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { fetchCouponSlice, redeemCouponSlice } from "../../../store/couponSlice";
import { RootState, useAppDispatch } from '../../../store';
import { useSelector } from 'react-redux';
import Layout from "../../../src/components/layout";
import { formatDate } from "../../../utils/utils";
import { Button } from "react-bootstrap";
import utilStyles from '../../../src/styles/utils.module.scss';


const CouponPage = ({ params }: { params: { couponId: string } }) => {
  const router = useRouter();
  const { redeem } = router.query; // Access query parameters directly
  const couponId = Array.isArray(router.query.couponId) ? router.query.couponId[0] : router.query.couponId;
  const dispatch = useAppDispatch();
  const { coupon, couponLoading } = useSelector((state: RootState) => state.coupon);

  useEffect(() => {
    if (coupon && redeem === 'true' && !coupon.isRedeemed && couponId) {
      const payload = {
        _id: couponId,
        blockId: coupon.blockId
      }
      dispatch(redeemCouponSlice(payload));
    }
  }, [coupon, redeem, dispatch, couponId]);

  useEffect(() => {
    if (couponId) {
      dispatch(fetchCouponSlice({ _id: couponId }));
    }
  }, [couponId, dispatch]);


  const handleRedeemCoupon = () => {
    const confirmDelete = window.confirm("Are you sure you want to redeem this coupon?");
    if (confirmDelete && couponId) {
      const payload = {
        _id: couponId,
        blockId: coupon.blockId
      }
      dispatch(redeemCouponSlice(payload));
    }
  };

  return (
    <Layout title="Coupon Detail" logo="/images/logo.jpg" showABN>
      <>
        {couponLoading &&
          <div>
            Loading
          </div>
        }
        {
          !couponLoading && coupon && (
            <div>
              <h3>Coupon : {coupon.couponId}</h3>
              <p>Description: {coupon.description}</p>
              <p>Expire Date: {formatDate(coupon.expireDate)}</p>
              {coupon.isRedeemed ? (
                <p>Status: Redeemed.</p>
              ) : (
                <div>
                  <p>Status: UnRedeem</p>
                  <Button
                    variant="primary"
                    className={utilStyles.button}
                    onClick={handleRedeemCoupon}
                  >
                    Redeem
                  </Button>
                </div>
              )}
            </div>
          )
        }
      </>
    </Layout>
  )
}

export default CouponPage;
