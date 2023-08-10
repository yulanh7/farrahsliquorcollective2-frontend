// components/CouponTable.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { redeemCouponSlice, addCouponSlice } from "../../store/couponSlice"
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { fetchAllCouponSlice } from "../../store/couponSlice";

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}

// interface CouponTableProps {
//   allCoupons: Coupon[];
// }




const CouponTable: React.FC = () => {
  const { allCoupons, allCouponsLoading } = useSelector((state: RootState) => state.coupon);

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

  useEffect(() => {
    dispatch(fetchAllCouponSlice());
  }, [dispatch]);

  const validateForm = () => {
    let isValid = true;
    const newErrors: {
      description?: string;
      expireDate?: string;
      scheduleTime?: string;

    } = {};

    if (description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (expireDate.trim() === '') {
      newErrors.expireDate = 'Expire Date is required';
      isValid = false;
    }
    if (scheduleTime.trim() === '') {
      newErrors.scheduleTime = 'Expire Date is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

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

    await dispatch(addCouponSlice(payload));
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

  const handleAddCoupon = async () => {
    if (validateForm()) {
      const payload = {
        description,
        expireDate,
        scheduleTime
      };
      await dispatch(addCouponSlice(payload));
      await dispatch(fetchAllCouponSlice()); // Fetch all coupons to refresh the table


    }
  }

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
        <tr>
          <td></td>
          <td>
            <Form.Control type="text"
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              className={`form-control ${errors.description && 'is-invalid'}`}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}

          </td>
          <td>

            <input
              type="date"
              className={`form-control ${errors.expireDate && 'is-invalid'}`}
              id="expireDate"
              value={formatDateForInput(expireDate)}
              onChange={(e) => setExpireDate(e.target.value)}
              onFocus={(e) => e.target.type = "date"}
            />
            {errors.expireDate && <div className="invalid-feedback">{errors.expireDate}</div>}

          </td>
          <td>
            <Form.Control
              type="datetime-local"
              onChange={(e) => setScheduleTime(e.target.value)}
              className={`form-control ${errors.scheduleTime && 'is-invalid'}`}
            />
            {errors.scheduleTime && <div className="invalid-feedback">{errors.scheduleTime}</div>}
          </td>
          <td>

            <div className={utilStyles.pB10px}>
              <Button variant="success" onClick={handleAddCoupon} className={utilStyles.tableButton}>
                Save
              </Button>
            </div>

            <Button variant="secondary" size="sm" onClick={handleCancelEdit} className={utilStyles.tableButton}>
              Cancel
            </Button>
          </td>
        </tr>
        {allCouponsLoading &&
          <tr>
            <td colSpan={5} className={utilStyles.loadingRow}>
              Loading...
            </td>
          </tr>
        }
        {allCoupons && allCoupons.length && !allCouponsLoading && allCoupons.map((coupon: Coupon) => (
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
                  onChange={(e) => setScheduleTime(e.target.value)}

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
