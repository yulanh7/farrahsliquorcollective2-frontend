import React, { useEffect, useState, FormEvent } from "react";
import Layout from "../src/components/layout";
import { useRouter } from "next/router";
import { useSelector } from 'react-redux';
import { fetchDefaultOffer } from '../store/offerSlice';
import { RootState, useAppDispatch } from '../store';
import { getCookie, formatDate } from "../utils/utils";
import { getUserInfoSlice } from '../store/userSlice';
import CouponComponent from '../src/components/couponComponent';

const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL;

export default function Post() {
  const router = useRouter();
  const [hash, setHash] = useState<string>(""); // Specify the type explicitly as string
  const [subscriptionData, setSubscriptionData] = useState<PushSubscriptionJSON | null | undefined>(null);
  const { defaultOffer, defaultOfferLoading } = useSelector((state: RootState) => state.offer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userHash = getCookie('userHash');
    const subscriptionDataStr = getCookie('subscription');
    const parsedSubscriptionData = subscriptionDataStr ? JSON.parse(subscriptionDataStr) : null;
    setHash(userHash || ""); // Set the initial state with a default value
    setSubscriptionData(parsedSubscriptionData); // Set the parsed subscription data
  }, []);

  useEffect(() => {
    // Redirect to the new page only if the user is not null
    const hash = getCookie('userHash');
    if (hash) {
      const payload = {
        userHash: hash,
      };
      dispatch(fetchDefaultOffer(payload));
    }
  }, [dispatch]);

  useEffect(() => {  // Make the useEffect function asynchronous
    if (hash && subscriptionData) {
      const payload = {
        userHash: hash,
        endpoint: subscriptionData?.endpoint || "default_endpoint_value",
        expirationTime: subscriptionData?.expirationTime || null,
        keys: subscriptionData?.keys || {}
      };

      dispatch(getUserInfoSlice(payload));
    } else {
      router.push("/offer-receipt");
    }

  }, []);

  return (
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showABN>
      <CouponComponent coupon={defaultOffer} loading={defaultOfferLoading} />
    </Layout>
  );
}
