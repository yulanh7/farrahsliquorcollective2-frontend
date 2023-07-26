import axios from "axios";
import { companyName } from "../utils/utils";

const API_URL = "http://localhost:3008";
export const getOffersData = async () => {
  const response = await axios.get("/api/offer"); // Replace with your actual API endpoint
  return response.data;
};

export const getUser = async (payload: {
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
    throw new Error("Failed to submit payload to the external API");
  }
};
