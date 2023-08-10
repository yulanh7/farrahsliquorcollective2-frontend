// components/CouponTable.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { deleteCouponSlice, addCouponSlice, fetchAllCouponSlice } from "../../store/couponSlice"
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';

interface Coupon {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
  isPushed: boolean;
}

// interface CouponTableProps {
//   allCoupons: Coupon[];
// }




const CouponTable: React.FC = () => {
  const { allCoupons, allCouponsLoading } = useSelector((state: RootState) => state.coupon);

  const dispatch = useAppDispatch();
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [addDescription, setAddDescription] = useState('');
  const [addExpireDate, setAddExpireDate] = useState('');
  const [addScheduleTime, setAddScheduleTime] = useState('');
  const [description, setDescription] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const [errors, setErrors] = useState<{
    description?: string;
    expireDate?: string;
    scheduleTime?: string;
  }>({});
  const [addErrors, setAddErrors] = useState<{
    addDescription?: string;
    addExpireDate?: string;
    addScheduleTime?: string;
  }>({});

  useEffect(() => {
    dispatch(fetchAllCouponSlice());
  }, [dispatch]);

  const validateAddForm = () => {
    let isValid = true;
    const newErrors: {
      addDescription?: string;
      addExpireDate?: string;
      addScheduleTime?: string;

    } = {};

    if (addDescription.trim() === '') {
      newErrors.addDescription = 'Description is required';
      isValid = false;
    }

    if (addExpireDate.trim() === '') {
      newErrors.addExpireDate = 'Expire Date is required';
      isValid = false;
    }
    if (addScheduleTime.trim() === '') {
      newErrors.addScheduleTime = 'Expire Date is required';
      isValid = false;
    }
    setAddErrors(newErrors);
    return isValid;
  };

  const validateEditForm = () => {
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
    const isoExpireDate = new Date(expireDate).toISOString(); // Format expireDate to ISO8601
    const isoScheduleTime = new Date(scheduleTime).toISOString(); // Format scheduleTime to ISO8601

    const payload = {
      description,
      expireDate: isoExpireDate,
      scheduleTime: isoScheduleTime,
    }
    debugger
    await dispatch(addCouponSlice(payload));
    setEditingCouponId(null);
  };

  const handleDeleteClick = async (couponId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
    if (confirmDelete) {
      // Perform the deletion logic here
      // dispatch(deleteCoupon(couponId));

      await dispatch(deleteCouponSlice({ _id: couponId }));
      await dispatch(fetchAllCouponSlice()); // Fetch all coupons to refresh the table
      setEditingCouponId(null);

    }
  };

  const handleAddCoupon = async () => {
    if (validateAddForm()) {
      const isoExpireDate = new Date(addExpireDate).toISOString(); // Format addEto ISO8601
      const isoScheduleTime = new Date(addScheduleTime).toISOString(); // Format scheduleTime to ISO8601

      const payload = {
        description: addDescription,
        expireDate: isoExpireDate,
        scheduleTime: isoScheduleTime,
      };

      await dispatch(addCouponSlice(payload));
      await dispatch(fetchAllCouponSlice()); // Fetch all coupons to refresh the table
      setAddDescription('');
      setAddExpireDate('');
      setAddScheduleTime('');


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
            <input
              type="text"
              className={`form-control ${addErrors.addDescription && 'is-invalid'}`}
              id="addDescription"
              value={addDescription}
              onChange={(e) => setAddDescription(e.target.value)}
            />
            {addErrors.addDescription && <div className="invalid-feedback">{addErrors.addDescription}</div>}

          </td>
          <td>

            <input
              type="date"
              className={`form-control ${addErrors.addExpireDate && 'is-invalid'}`}
              id="addExpireDate"
              value={formatDateForInput(addExpireDate)}
              onChange={(e) => setAddExpireDate(e.target.value)}
              onFocus={(e) => e.target.type = "date"}
            />
            {addErrors.addExpireDate && <div className="invalid-feedback">{addErrors.addExpireDate}</div>}

          </td>
          <td>
            <input
              type="datetime-local"
              className={`form-control ${addErrors.addScheduleTime && 'is-invalid'}`}
              id="addScheduleTime"
              value={formatDatetimeLocalForInput(addScheduleTime)}
              onChange={(e) => setAddScheduleTime(e.target.value)}
            />

            {addErrors.addScheduleTime && <div className="invalid-feedback">{addErrors.addScheduleTime}</div>}
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
                    <Button variant="primary" onClick={() => handleEditClick(coupon._id)} className={`${utilStyles.tableButton} ${coupon.isPushed ? "hide" : ""}`} disabled={coupon.isPushed}>
                      Edit
                    </Button>
                  </div>
                  <Button variant="danger" onClick={() => handleDeleteClick(coupon._id)} className={`${utilStyles.tableButton} ${coupon.isPushed ? "hide" : ""}`} disabled={coupon.isPushed}>
                    Delete
                  </Button>

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
