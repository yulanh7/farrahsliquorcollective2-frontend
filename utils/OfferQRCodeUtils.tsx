import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import PropTypes from 'prop-types';

interface CouponRedemptionProps {
  url?: string;
}

const CouponRedemption: React.FC<CouponRedemptionProps> = ({ url }) => {
  const [couponData, setCouponData] = useState('');
  const [isRedeemed, setIsRedeemed] = useState(false);

  const handleScan = (data: any) => {
    if (data) {
      setCouponData(data);
      redeemCoupon(data);
    }
  };

  const redeemCoupon = async (couponCode: string) => {
    try {
      setIsRedeemed(true);
      // Call your API and handle coupon redemption logic here
    } catch (error) {
      console.error('Coupon redemption error:', error);
    }
  };

  return (
    <div>
      {isRedeemed && url ? (
        <p>Coupon successfully redeemed!</p>
      ) : (
        <>
          {url && (
            <>
              <p>Scan the QR code to redeem your coupon.</p>
              <QRCode value={url} />
            </>
          )}
        </>
      )}
    </div>
  );
};

CouponRedemption.propTypes = {
  url: PropTypes.string.isRequired,
};

export default CouponRedemption;
