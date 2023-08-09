// components/CouponTable.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
// import { formatDateForInput } from "../../utils/utils";

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}

interface CouponTableProps {
  allCoupons: Coupon[];
}

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'am' : 'pm';

  return `${day}/${month}/${year} ${hours}:${minutes} ${ampm}`;
}

const formatDefaultScheduleTime = (scheduleTime: string) => {
  const date = new Date(scheduleTime);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;
  return formattedDate;
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

  const handleSaveEdit = (couponId: string) => {
    // Dispatch action to update coupon data
    // dispatch(updateCoupon(coupon));
    setEditingCouponId(null);
  };

  const handleDeleteClick = (couponId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
    if (confirmDelete) {
      // Perform the deletion logic here
      // dispatch(deleteCoupon(couponId));
    }
  };

  return (
    <table className="table">
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
                  defaultValue={formatDefaultScheduleTime(coupon.scheduleTime)}
                  onChange={(e) => {
                    // Update the coupon's scheduleTime in state when edited
                  }}
                />
              ) : (
                formatDate(coupon.scheduleTime)
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (
                <>
                  <Button variant="success" size="sm" onClick={() => handleSaveEdit(coupon._id)}>
                    Save
                  </Button>
                  <Button variant="secondary" size="sm" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="primary" size="sm" onClick={() => handleEditClick(coupon._id)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteClick(coupon._id)}>
                    Delete
                  </Button>{' '}

                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CouponTable;
