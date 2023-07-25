// api/offerApi.ts

import axios from "axios";

export const getOffersData = async () => {
  const response = await axios.get("/api/offer"); // Replace with your actual API endpoint
  return response.data;
};
