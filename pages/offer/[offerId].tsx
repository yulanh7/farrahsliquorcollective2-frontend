// pages/[couponId].tsx

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { fetchOfferSlice } from "../../store/offerSlice";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import CouponComponent from '../../src/components/couponComponent';
import Layout from "../../src/components/layout";


const CouponPage = () => {
  const router = useRouter();
  const offerId = Array.isArray(router.query.offerId) ? router.query.offerId[0] : router.query.offerId;
  const dispatch = useAppDispatch();
  const { offer, offerLoading } = useSelector((state: RootState) => state.offer);

  useEffect(() => {
    if (offerId) {
      dispatch(fetchOfferSlice({ _id: offerId }));
    }
  }, [offerId, dispatch]);


  return (
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showABN>
      {offerId &&
        <CouponComponent coupon={offer} loading={offerLoading} offerId={offerId} />
      }
    </Layout>
  )
}

export default CouponPage;
