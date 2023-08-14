// components/CouponTable.tsx
import React, { useState, useEffect } from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { formatDateForInput, formatDatetimeLocal, formatDatetimeLocalForInput, formatDate } from "../../utils/utils";
import utilStyles from "../styles/utils.module.scss";
import { deleteCouponSlice, addCouponSlice, fetchAllCouponSlice, updateCouponSlice } from "../../store/couponSlice"
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
  const { allCoupons, couponLoading } = useSelector((state: RootState) => state.coupon);

  const dispatch = useAppDispatch();
  const [editingCouponId, setEditingCouponId] = useState<string | null>(null);
  const [editingCoupons, setEditingCoupons] = useState<Map<string, Coupon>>(new Map());

  const [addDescription, setAddDescription] = useState('');
  const [addExpireDate, setAddExpireDate] = useState('');
  const [addScheduleTime, setAddScheduleTime] = useState('');
  // const [description, setDescription] = useState('');
  // const [expireDate, setExpireDate] = useState('');
  // const [scheduleTime, setScheduleTime] = useState('');
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
    const now = new Date();
    const newAddExpireDate = new Date(addExpireDate);
    const newAddScheduleTime = new Date(addScheduleTime);
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
    } else if (newAddExpireDate <= now) {
      newErrors.addExpireDate = 'Expire Date must be greater than now';
      isValid = false;
    }

    if (addScheduleTime.trim() === '') {
      newErrors.addScheduleTime = 'Schedule Time is required';
      isValid = false;
    } else if (newAddScheduleTime <= now) {
      newErrors.addScheduleTime = 'Schedule Time must be greater than now';
      isValid = false;
    }

    setAddErrors(newErrors);
    return isValid;
  };

  const validateEditForm = (editedCoupon: Coupon) => {
    const now = new Date();
    const newExpireDate = new Date(editedCoupon.expireDate);
    const newScheduleTime = new Date(editedCoupon.scheduleTime);
    let isValid = true;
    const newErrors: {
      description?: string;
      expireDate?: string;
      scheduleTime?: string;
    } = {};

    if (editedCoupon.description.trim() === '') {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (editedCoupon.expireDate.trim() === '') {
      newErrors.expireDate = 'Expire Date is required';
      isValid = false;
    } else if (newExpireDate <= now) {
      newErrors.expireDate = 'Expire Date must be greater than now';
      isValid = false;
    }

    if (editedCoupon.scheduleTime.trim() === '') {
      newErrors.scheduleTime = 'Schedule Time is required';
      isValid = false;
    } else if (newScheduleTime <= now) {
      newErrors.scheduleTime = 'Schedule Time must be greater than now';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleEditClick = (couponId: string) => {
    setEditingCouponId(couponId);
    const couponToEdit = allCoupons.find((coupon: Coupon) => coupon._id === couponId);
    if (couponToEdit) {
      const updatedEditingCoupons = new Map(editingCoupons);
      updatedEditingCoupons.set(couponId, { ...couponToEdit });
      setEditingCoupons(updatedEditingCoupons);
    }
  };


  const handleCancelEdit = () => {
    setEditingCouponId(null);
  };

  const handleSaveEdit = async (couponId: string) => {
    const editedCoupon = editingCoupons.get(couponId);

    if (!editedCoupon) {
      // Handle the case where the editedCoupon is not found (error handling)
      return;
    }
    if (validateEditForm(editedCoupon)) {
      const isoExpireDate = new Date(editedCoupon.expireDate).toISOString();
      const isoScheduleTime = new Date(editedCoupon.scheduleTime).toISOString();
      const payload = {
        description: editedCoupon.description,
        expireDate: isoExpireDate,
        scheduleTime: isoScheduleTime,
        _id: couponId,
      };
      await dispatch(updateCouponSlice(payload));
      setEditingCouponId(null);
    }

  };

  const handleDeleteClick = async (couponId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
    if (confirmDelete) {
      await dispatch(deleteCouponSlice({ _id: couponId }));
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
      setAddDescription('');
      setAddExpireDate('');
      setAddScheduleTime('');
    }
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Status</th>
          <th>Description</th>
          <th>Expire Date</th>
          <th>Schedule Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td></td>
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
                Add
              </Button>
            </div>

            <Button variant="secondary" size="sm" onClick={handleCancelEdit} className={utilStyles.tableButton}>
              Cancel
            </Button>
          </td>
        </tr>
        {couponLoading &&
          <tr>
            <td colSpan={5} className={utilStyles.loadingRow}>
              Loading...
            </td>
          </tr>
        }
        {allCoupons && allCoupons.length && !couponLoading && allCoupons.map((coupon: Coupon, index: number) => (
          <tr key={coupon._id}>
            <td>{index + 1}</td>
            <td>{coupon.isPushed ? "Pushed" : "Unpushed"}</td>
            <td>
              {editingCouponId === coupon._id ? (
                <>
                  <Form.Control
                    type="text"
                    defaultValue={coupon.description}
                    className={errors.description && 'is-invalid'}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const updatedEditingCoupons = new Map(editingCoupons);
                      const editedCoupon = updatedEditingCoupons.get(coupon._id);
                      if (editedCoupon) {
                        editedCoupon.description = newValue;
                        updatedEditingCoupons.set(coupon._id, editedCoupon);
                        setEditingCoupons(updatedEditingCoupons);
                      }
                    }}
                  />
                  {errors.description && <div className="invalid-feedback">{errors.description}</div>}

                </>

              ) : (
                coupon.description
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (
                <>
                  <Form.Control
                    type="date"
                    className={errors.expireDate && 'is-invalid'}

                    defaultValue={formatDateForInput(coupon.expireDate)}
                    onChange={(e) => {
                      const newValue = e.target.value;
                      const updatedEditingCoupons = new Map(editingCoupons);
                      const editedCoupon = updatedEditingCoupons.get(coupon._id);
                      if (editedCoupon) {
                        editedCoupon.expireDate = newValue;
                        updatedEditingCoupons.set(coupon._id, editedCoupon);
                        setEditingCoupons(updatedEditingCoupons);
                      }
                    }}
                  />
                  {errors.expireDate && <div className="invalid-feedback">{errors.expireDate}</div>}

                </>
              ) : (
                formatDate(coupon.expireDate)
              )}
            </td>
            <td>
              {editingCouponId === coupon._id ? (
                <>
                  <Form.Control
                    type="datetime-local"
                    defaultValue={formatDatetimeLocalForInput(coupon.scheduleTime)}
                    className={errors.scheduleTime && 'is-invalid'}

                    onChange={(e) => {
                      const newValue = e.target.value;
                      const updatedEditingCoupons = new Map(editingCoupons);
                      const editedCoupon = updatedEditingCoupons.get(coupon._id);
                      if (editedCoupon) {
                        editedCoupon.scheduleTime = newValue;
                        updatedEditingCoupons.set(coupon._id, editedCoupon);
                        setEditingCoupons(updatedEditingCoupons);
                      }
                    }}
                  />
                  {errors.scheduleTime && <div className="invalid-feedback">{errors.scheduleTime}</div>}
                </>
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
                    <Button variant="primary" onClick={() => handleEditClick(coupon._id)} className={`${utilStyles.tableButton}`} disabled={coupon.isPushed}>
                      {coupon.isPushed ? "Disable" : "Edit"}
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
