// components/WalletTable.tsx
import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { fetchAllOffersSlice } from '../../store/offerSlice';
import { getCookie } from "../../utils/utils";

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
  isPushed: boolean;
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
          <th>ID</th>
          <th>Description</th>
          <th>Expire Date</th>
          <th>Schedule Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {allOffers && allOffers.length && allOffers.map((coupon: Coupon) => (
          <tr key={coupon._id}>
            <td>{coupon._id}</td>
            <td>
              {coupon.description}

            </td>
            <td>
              {formatDate(coupon.expireDate)}

            </td>
            <td>
              {formatDatetimeLocal(coupon.scheduleTime)}


            </td>
            <td>
              <Button variant="danger" className={utilStyles.tableButton}>
                Delete
              </Button>

            </td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
};

export default WalletTable;
