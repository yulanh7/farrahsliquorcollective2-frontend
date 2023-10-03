// components/WalletTable.tsx
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { fetchAllOffersSlice } from '../../store/offerSlice';
import { getCookie } from "../../utils/utils";

interface Coupon {
  block_id: string;
  couponId: string;
  description: string;
  expireDate: string;
  isRedeemed: boolean;
}

const WalletTable: React.FC = () => {
  const dispatch = useAppDispatch();
  const { allOffers, offerLoading } = useSelector((state: RootState) => state.offer);

  useEffect(() => {
    const userHash = getCookie("userHash");
    if (userHash) {
      const payload = {
        userHash
      }
      dispatch(fetchAllOffersSlice(payload));
    }
  }, [dispatch]);


  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>ID</th>
          <th>Description</th>
          <th>Expire Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allOffers && allOffers.length && allOffers.map((coupon: Coupon, index: number) => (
          <tr key={coupon.couponId}>
            <td>{index + 1}</td>
            <td>{coupon.couponId}</td>
            <td>
              {coupon.description}</td>
            <td>
              {formatDate(coupon.expireDate)}

            </td>
            <td>
              {coupon.isRedeemed ? <span>Redeemed</span> : <span>UnRedeemed</span>}
            </td>
            <td>
              <a href={`/offer/${coupon.couponId}`} target="_blank">

                <Button variant="danger" className={utilStyles.tableButton}>
                  Detail
                </Button>
              </a>

            </td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
};

export default WalletTable;
