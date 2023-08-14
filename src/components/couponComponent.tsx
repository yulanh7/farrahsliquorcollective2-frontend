import React from "react";
import utilStyles from "../styles/utils.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import QRCodeGenerator from "../../utils/QRCodeUtils";
import { formatDate } from "../../utils/utils";
import Link from 'next/link';

const HOME_URL = process.env.NEXT_PUBLIC_HOME_URL;
interface Coupon {
  _id: string;
  couponId: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
  isPushed: boolean;
}

interface CouponComponentProps {
  coupon: Coupon;
  loading: boolean;
}


export default function CouponComponent({ coupon, loading }: CouponComponentProps) {

  return (
    <>
      {loading &&
        <div>
          loading...</div>
      }
      {
        !loading && coupon && (
          <>
            <Container>
              <Row>
                <Col sm="12" md="6">
                  <QRCodeGenerator url={`${HOME_URL}/admin/coupon/${coupon._id}?redeem=true`} className="qrcode80" />
                </Col>
                <Col sm="12" md="6" className={`${utilStyles.pT30px}`}>
                  <span className={`${utilStyles.headingSm}`}>Unique ID:</span><span> {coupon.couponId}</span>
                  <div
                    className={`${utilStyles.text} ${utilStyles.pB10px} ${utilStyles.pT10px}`}
                  >
                    {coupon.description}

                  </div>
                  <div className={` ${utilStyles.pT30px}`}>
                    <Link href="/opt-out">
                      <Button
                        variant="primary"
                        className={utilStyles.button}
                      >
                        <div className={utilStyles.textXs}>UNSUBSCRIBE</div>
                        OPT OUT
                      </Button>
                    </Link>
                  </div>
                </Col>
              </Row>
            </Container>
            <div
              className={`${utilStyles.pB10px} ${utilStyles.textCenter} ${utilStyles.pT30px}`}
            >
              <span className={`${utilStyles.headingMd}`}>Expire Date:</span><span className={`${utilStyles.textMd}`}> {formatDate(coupon.expireDate)}</span>


            </div>
          </>
        )
      }

    </>
  );
}
