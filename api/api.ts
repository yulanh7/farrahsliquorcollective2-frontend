import axios from "axios";
import { companyName } from "../utils/utils";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const getOffersData = async () => {
  const response = await axios.get("/api/offer"); // Replace with your actual API endpoint
  return response.data;
};

export const optIn = async (payload: {
  userHash: string;
  endpoint?: string; // Make 'endpoint' optional
  expirationTime: number | null; // Change to 'number | null'
  keys: Record<string, string>;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/withBlockchainSubscribe`,
      {
        ...payload,
        companyName,
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to creat a user");
  }
};
export const getUserInfo = async (payload: {
  userHash: string;
  endpoint?: string; // Make 'endpoint' optional
  expirationTime: number | null; // Change to 'number | null'
  keys: Record<string, string>;
}) => {
  try {
    const response = await axios.post(`${API_URL}/user/getInfo`, {
      ...payload,
      companyName,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get the user's info");
  }
};

export const getDefaultCouponData = async (payload: { userHash: string }) => {
  try {
    const response = await axios.post(`${API_URL}/user/defaultCoupon`, {
      ...payload,
      companyName,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to get a default offer");
  }
};

export const submitUnsubscribe = async (payload: { userHash: string }) => {
  try {
    const response = await axios.put(`${API_URL}/user/unsubscribe`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to unsubcribe");
  }
};

export const addCoupon = async (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
  scheduleTime: string; // Change to 'number | null'
}) => {
  try {
    const response = await axios.post(`${API_URL}/coupon`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to creat a Coupon");
  }
};
export const fetchAllCoupons = async () => {
  try {
    const response = await axios.get(`${API_URL}/coupons/nonDefault`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const redeemCoupon = async (payload: { _id: string }) => {
  try {
    const response = await axios.put(`${API_URL}/coupon/redeem/${payload._id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete a Coupon");
  }
};
export const deleteCoupon = async (payload: { _id: string }) => {
  try {
    const response = await axios.delete(`${API_URL}/coupon/${payload._id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete a Coupon");
  }
};

export const addDefaultCoupon = async (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
}) => {
  try {
    const response = await axios.post(`${API_URL}/defaultCoupon`, {
      ...payload,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to creat a default coupon");
  }
};

export const updateDefaultCoupon = async (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
}) => {
  try {
    const response = await axios.put(`${API_URL}/defaultCoupon`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to update a default coupon");
  }
};

export const fetchDefaultCoupon = async () => {
  try {
    const response = await axios.get(`${API_URL}/defaultCoupon`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to creat a default coupon");
  }
};

export const sendFeedback = async (payload: { feedback: string }) => {
  try {
    const response = await axios.post(`${API_URL}/sendFeedback`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to seed your feedback");
  }
};
