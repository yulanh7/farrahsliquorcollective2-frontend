import React, { useState, ChangeEvent, useEffect } from "react";
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import QRCodeGenerator from "../utils/QRCodeUtils";
import Link from "next/link";
import { RootState, useAppDispatch } from '../store';
// import { getCookie } from "../utils/utils";
// import { useSelector } from 'react-redux';
// import { getUserInfoSlice } from '../store/userSlice';
// import { run } from '../lib/notification'; // Import the run function from the notification.ts file
import { useRouter } from 'next/router';


export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  // const { userInfo } = useSelector((state: RootState) => state.user);
  // const [subscriptionData, setSubscriptionData] = useState<PushSubscriptionJSON | null | undefined>(null);
  const url = `${process.env.NEXT_PUBLIC_HOME_URL}/detail` || '/detail';
  // useEffect(() => {
  //   const setupPushNotification = async () => {
  //     const subscription = JSON.stringify(await run());
  //     setSubscriptionData(JSON.parse(subscription));
  //   };

  //   setupPushNotification();
  // }, []);

  // useEffect(() => {
  //   const hash = getCookie('userHash');
  //   if (hash) {
  //     const payload = {
  //       userHash: hash,
  //       endpoint: subscriptionData?.endpoint || "default_endpoint_value",
  //       expirationTime: subscriptionData?.expirationTime || null,
  //       keys: subscriptionData?.keys || {}
  //     };
  //     dispatch(getUserInfoSlice(payload));
  //   }
  // }, []);


  // useEffect(() => {
  //   // Redirect to the new page only if the user is not null
  //   if (userInfo && userInfo.subscriptionStatus) {
  //     router.push("/offer-receipt")
  //   }
  // }, [userInfo, router]);


  return (
    <Layout title="WELCOME - OPT IN" logo="/images/logo.jpg" showABN>
      <h5
        className={`${utilStyles.flexCenter} ${utilStyles.pB10px}`}
      >
        OPT IN OFFER TO REGISTER
      </h5>
      <QRCodeGenerator url={url} className="qrcode40" />
      <p
        className={`${utilStyles.text} ${utilStyles.lightText} ${utilStyles.flexCenter} ${utilStyles.pT10px}`}
      >
        <span className={`${utilStyles.pR5px} ${utilStyles.darkText}`}>
          URL:
        </span>
        <Link href={url}>
          {url}
        </Link>

      </p>

    </Layout>
  );
}
