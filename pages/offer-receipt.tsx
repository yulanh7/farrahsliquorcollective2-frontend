import React, { useEffect, useState, FormEvent } from "react";
import Layout from "../src/components/layout";
import utilStyles from "../src/styles/utils.module.scss";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import QRCodeGenerator from "../utils/QRCodeUtils";
import { useSelector } from 'react-redux';
import { fetchDefaultOffer } from '../store/offerSlice';
import { RootState, useAppDispatch } from '../store';
import { getHash, getCookie } from "../utils/utils";
import { getUserInfoSlice } from '../store/userSlice';

export default function Post() {
  const router = useRouter();
  const { userWithData, userInfo } = useSelector((state: RootState) => state.user);
  const [hash, setHash] = useState<string>(""); // Specify the type explicitly as string
  const [subscriptionData, setSubscriptionData] = useState<PushSubscriptionJSON | null | undefined>(null);
  const { defaultOffer, defaultOfferLoading } = useSelector((state: RootState) => state.offer);
  const [url, setUrl] = useState("");
  // const uniqueId = router.query.uniqueId;
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
    <Layout title="OFFER RECEIPT" logo="/images/logo.jpg" showOptOut showABN>
      {defaultOfferLoading &&
        <div>
          loading...</div>
      }
      {
        !defaultOfferLoading && defaultOffer && (
          <>
            <Container>
              <Row>
                <Col sm="12" md="6">
                  <QRCodeGenerator url={defaultOffer.couponId} className="qrcode80" />
                </Col>
                <Col sm="12" md="6" className={`${utilStyles.pT30px}`}>
                  <h5 className={`${utilStyles.pB10px}`}>Unique ID:</h5>
                  <div>{defaultOffer.couponId} </div>
                </Col>
              </Row>
            </Container>
            <div
              className={`${utilStyles.text} ${utilStyles.pB10px} ${utilStyles.textCenter} ${utilStyles.pT30px}`}
            >
              {defaultOffer.description}
              <div>
                Expire Date: {defaultOffer.expireDate}
              </div>
            </div>
            <div className={utilStyles.textCenter}>
              <Button variant="primary" type="submit" className={utilStyles.button}>
                SUBMIT
              </Button>
            </div>
          </>
        )
      }

    </Layout>
  );
}
