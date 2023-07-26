import axios from "axios";

const companyName = "Farrah's Liquor Collective";
const API_URL = "http://localhost:3008";
export const getOffersData = async () => {
  const response = await axios.get("/api/offer"); // Replace with your actual API endpoint
  return response.data;
};

export const getUser = async (payload: {
  companyName: string;
  userHash: string;
  endpoint?: string; // Make 'endpoint' optional
  expirationTime: number | null; // Change to 'number | null'
  keys: Record<string, string>;
}) => {
  try {
    const response = await axios.post(
      `${API_URL}/user/withBlockchainSubscribe`,
      payload
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to submit payload to the external API");
  }
};

export const pushSubscribe = async (payload: {
  companyName: string;
  userId: string;
}) => {
  const host = window.location.host.replace(/:[0-9]{1,5}.*/, "");
  let currentId = null;

  try {
    const response = await axios.post(
      `${API_URL}/user/withBlockchain`,
      payload
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to submit payload to the external API");
  }
};
