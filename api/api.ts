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
  // Check if running in the browser
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("farrahsliquorcollectiveToken");
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
  // Return empty headers object if not running in the browser
  return {};
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

export const optIn = (payload: {
  userHash: string;
  endpoint?: string; // Make 'endpoint' optional
  expirationTime: number | null; // Change to 'number | null'
  keys: Record<string, string>;
}) =>
  makeRequest(
    "post",
    "/user/withBlockchainSubscribe",
    {
      ...payload,
      companyName,
    },
    false
  );

export const getUserInfo = (payload: {
  userHash: string;
  endpoint?: string; // Make 'endpoint' optional
  expirationTime: number | null; // Change to 'number | null'
  keys: Record<string, string>;
}) =>
  makeRequest(
    "post",
    "/user/getInfo",
    {
      ...payload,
      companyName,
    },
    false
  );

export const getDefaultCouponData = (payload: { userHash: string }) =>
  makeRequest(
    "post",
    "/user/defaultCoupon",
    {
      ...payload,
      companyName,
    },
    false
  );

export const submitUnsubscribe = (payload: {
  userHash: string;
  endpoint: string;
}) => makeRequest("put", "/user/unsubscribe", payload, false);

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
  makeRequest("get", `/admin/coupons/nonDefault`);

export const fetchCoupon = async (payload: { _id: string }) =>
  makeRequest("get", `/coupon/${payload._id}`, {}, false);

export const fetchAllOffers = async (payload: { userHash: string }) =>
  makeRequest("post", "/user/coupons", payload, false);

export const updateCoupon = (payload: {
  _id: string;
  description: string;
  expireDate: string;
  scheduleTime: string;
}) => makeRequest("put", `${API_URL}/admin/coupon/${payload._id}`, payload);

export const deleteCoupon = (payload: { _id: string }) =>
  makeRequest("delete", `${API_URL}/admin/coupon/${payload._id}`);

export const addDefaultCoupon = (payload: {
  description: string;
  expireDate: string;
}) => makeRequest("post", `${API_URL}/admin/defaultCoupon`, payload);

export const updateDefaultCoupon = (payload: {
  description: string;
  expireDate: string;
}) => makeRequest("put", `${API_URL}/admin/defaultCoupon`, payload);

export const fetchDefaultCoupon = () =>
  makeRequest("get", "/admin/defaultCoupon");

export const sendFeedback = async (payload: {
  feedback: string;
  phone: string;
  name: string;
  email: string;
}) => makeRequest("post", "/sendFeedback", payload, false);
