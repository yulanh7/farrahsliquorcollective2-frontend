import React, { useEffect, useState } from "react";
import Layout from "../src/components/layout";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { fetchDefaultOfferSlice } from '../store/offerSlice';
import { getUserInfoSlice } from '../store/userSlice';
import { RootState, useAppDispatch } from '../store';
import { getCookie, formatDate } from "../utils/utils";
import CouponComponent from '../src/components/couponComponent';


export default function Post() {
  const router = useRouter();
  const [hash, setHash] = useState<string>(""); // Specify the type explicitly as string
  const [subscriptionData, setSubscriptionData] = useState<PushSubscriptionJSON | null | undefined>(null);
  const { defaultOffer, offerLoading } = useSelector((state: RootState) => state.offer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userHash = getCookie('userHash');
    const subscriptionDataStr = getCookie('subscription');
    const parsedSubscriptionData = subscriptionDataStr ? JSON.parse(subscriptionDataStr) : null;
    setHash(userHash || "");
    setSubscriptionData(parsedSubscriptionData);
  }, []);

  useEffect(() => {
    async function fetchData() {
      if (hash) {
        const payload = {
          userHash: hash,
        };
        await dispatch(fetchDefaultOfferSlice(payload));
      }
    }
    fetchData();
  }, [hash, dispatch]);

  useEffect(() => {
    async function fetchUserData() {
      if (hash && subscriptionData) {
        const payload = {
          userHash: hash,
          endpoint: subscriptionData?.endpoint || "default_endpoint_value",
          expirationTime: subscriptionData?.expirationTime || null,
          keys: subscriptionData?.keys || {}
        };

        await dispatch(getUserInfoSlice(payload));
      } else {
        // router.push("/detail");
      }
    }
    fetchUserData();
  }, [hash, subscriptionData, router, dispatch]);

  return (
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showABN>
      {offerLoading && (
        <div>Loading</div>
      )}
      {
        defaultOffer && !offerLoading &&
        <CouponComponent coupon={defaultOffer} loading={offerLoading} />
      }
    </Layout>
  );
}
