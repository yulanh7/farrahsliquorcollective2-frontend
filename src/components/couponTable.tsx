// components/CouponTable.tsx
import React, { useState } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { redeemCouponSlice } from "../../store/couponSlice"
import { RootState, useAppDispatch } from '../../store';

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}

interface CouponTableProps {
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

const CouponTable: React.FC<CouponTableProps> = () => {

  const dispatch = useAppDispatch();

  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');

  const handleEditClick = (couponId: string) => {
    setEditingCouponId(couponId);
  };



  const handleCancelEdit = () => {
    setEditingCouponId(null);
  };

  const handleSaveEdit = async (couponId: string) => {
    // Dispatch action to update coupon data
    // dispatch(updateCoupon(coupon));
    const payload = {
      description,
      expireDate,
      scheduleTime
    }


    setEditingCouponId(null);
  };

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
              {editingCouponId === coupon._id ? (
                <Form.Control type="text" defaultValue={coupon.description} onChange={(e) => {
                  setDescription(e.target.value)
                }} />

              ) : (
                coupon.description
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (

                <Form.Control
                  type="date"
                  defaultValue={formatDateForInput(coupon.expireDate)}
                  onChange={(e) => setExpireDate(e.target.value)}

                />
              ) : (
                formatDate(coupon.expireDate)
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (
                <Form.Control
                  type="datetime-local"
                  defaultValue={formatDatetimeLocalForInput(coupon.scheduleTime)}
                  onChange={(e) => {
                    // Update the coupon's scheduleTime in state when edited
                  }}
                />
              ) : (
                formatDatetimeLocal(coupon.scheduleTime)
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (
                <>
                  <div className={utilStyles.pB10px}>
                    <Button variant="success" onClick={() => handleSaveEdit(coupon._id)} className={utilStyles.tableButton}>
                      Save
                    </Button>
                  </div>
                  <Button variant="secondary" size="sm" onClick={handleCancelEdit} className={utilStyles.tableButton}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <div className={utilStyles.pB10px}>
                    <Button variant="primary" onClick={() => handleEditClick(coupon._id)} className={utilStyles.tableButton}>
                      Edit
                    </Button>
                  </div>
                  <Button variant="danger" onClick={() => handleDeleteClick(coupon._id)} className={utilStyles.tableButton}>
                    Delete
                  </Button>{' '}

                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </Table >
  );
};

export default CouponTable;
