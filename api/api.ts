import axios from "axios";
import { companyName } from "../utils/utils";
import Router from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const api = axios.create({
  baseURL: API_URL,
});

let isTokenErrorHandled = false;
const navigateToHomeOnTokenError = (error: any) => {
  if (
    !isTokenErrorHandled &&
    error.response &&
    (error.response.status === 401 || error.response.status === 403)
  ) {
    isTokenErrorHandled = true;
    localStorage.removeItem("userInfo");
    alert("Please login. Your session is invalid or expired.");
    Router.push("/login")
      .then(() => {
        // Reset the flag after navigation so it can work for subsequent errors
        isTokenErrorHandled = false;
      })
      .catch(() => {
        // Handle navigation error
        isTokenErrorHandled = false;
      });
  }
};

const getHeaders = () => {
  const token = localStorage.getItem("farrahsliquorcollectiveToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const makeRequest = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  payload?: any,
  needsAuth = true
) => {
  try {
    const headers = needsAuth ? getHeaders() : {};
    let response;
    switch (method) {
      case "get":
        response = await api.get(url, { headers, params: payload });
        break;
      case "put":
        response = await api.put(url, payload, { headers }); // Send payload in the request body
        break;
      case "delete":
        response = await api.delete(url, { headers, params: payload });
        break;
      default:
        response = await api.post(url, payload, { headers });
    }
    // const response =
    //   method === "get"
    //     ? await api.get(url, { headers, params: payload })
    //     : await api.post(url, payload, { headers });
    return response.data;
  } catch (error: any) {
    navigateToHomeOnTokenError(error);
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw error;
  }
};

export const login = (payload: { username: string; password: string }) =>
  makeRequest("post", `/admin/login`, payload, false); // login doesn't need auth

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

export const submitUnsubscribe = async (payload: {
  userHash: string;
  endpoint: string;
}) => {
  try {
    const response = await axios.put(`${API_URL}/user/unsubscribe`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to unsubcribe");
  }
};

export const addCoupon = (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
  scheduleTime: string; // Change to 'number | null'
}) => makeRequest("post", `${API_URL}/admin/coupon`, payload);

export const redeemCoupon = (payload: { blockId: string }) =>
  makeRequest(
    "put",
    `${API_URL}/admin/coupon/redeem/${payload.blockId}`,
    payload
  );

export const fetchAllCoupons = () =>
  makeRequest("get", `${API_URL}/admin/coupons/nonDefault`);

export const fetchCoupon = async (payload: { _id: string }) => {
  try {
    const response = await axios.get(`${API_URL}/admin/coupon/${payload._id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
export const fetchAllOffers = async (payload: { userHash: string }) => {
  try {
    const response = await axios.post(`${API_URL}/user/coupons`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const fetchOffer = async (payload: { _id: string }) => {
  try {
    const response = await axios.get(`${API_URL}/coupon/${payload._id}`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};

export const updateCoupon = (payload: {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}) => makeRequest("put", `${API_URL}/admin/coupon/${payload._id}`, payload);

export const deleteCoupon = (payload: { _id: string }) =>
  makeRequest("delete", `${API_URL}/admin/coupon/${payload._id}`);

export const addDefaultCoupon = (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
}) => makeRequest("post", `${API_URL}/admin/defaultCoupon`, payload);

export const updateDefaultCoupon = (payload: {
  description: string; // Make 'endpoint' optional
  expireDate: string; // Change to 'string'
}) => makeRequest("put", `${API_URL}/admin/defaultCoupon`, payload);

export const fetchDefaultCoupon = async () => {
  try {
    const response = await axios.get(`${API_URL}/defaultCoupon`);
    return response.data;
  } catch (error) {
    throw new Error("Failed to creat a default coupon");
  }
};

export const sendFeedback = async (payload: {
  feedback: string;
  phone: string;
  name: string;
  email: string;
}) => {
  try {
    const response = await axios.post(`${API_URL}/sendFeedback`, payload);
    return response.data;
  } catch (error) {
    throw new Error("Failed to seed your feedback");
  }
};
