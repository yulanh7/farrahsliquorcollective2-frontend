// components/WalletTable.tsx
import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { redeemCouponSlice, addCouponSlice } from "../../store/couponSlice"
import { RootState, useAppDispatch } from '../../store';

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}

interface WalletTableProps {
  allCoupons: Coupon[];
}


const allCoupons = [
  {
    "_id": "64d1e52d776d8e0f1544820b",
    "expireDate": "2023-08-31T00:00:00.000Z",
    "description": "This is 3-a default coupon",
    "scheduleTime": "2023-08-31T00:00:00.000Z"
  },
  {
    "_id": "64d1e52d776d8e0f1544820k",
    "expireDate": "2023-08-31T00:00:00.000Z",
    "description": "This is 3-a default coupon",
    "scheduleTime": "2023-08-31T00:00:00.000Z"
  }
]

const WalletTable: React.FC<WalletTableProps> = (isForAdmin) => {

  const dispatch = useAppDispatch();

  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [errors, setErrors] = useState<{
    description?: string;
    expireDate?: string;
    scheduleTime?: string;
  }>({});




  const handleDeleteClick = async (couponId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
    if (confirmDelete) {
      // Perform the deletion logic here
      // dispatch(deleteCoupon(couponId));

      await dispatch(redeemCouponSlice({ _id: couponId }));
      setEditingCouponId(null);

    }
  };


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
        {allCoupons.map((coupon: Coupon) => (
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
              <Button variant="danger" onClick={() => handleDeleteClick(coupon._id)} className={utilStyles.tableButton}>
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
