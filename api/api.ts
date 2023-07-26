import axios from "axios";

export const getOffersData = async () => {
  const response = await axios.get("/api/offer"); // Replace with your actual API endpoint
  return response.data;
};

export const pushSubscribe = async (payload: {
  businessOwner: string;
  userId: string;
}) => {
  const host = window.location.host.replace(/:[0-9]{1,5}.*/, "");
  let currentId = null;

  try {
    const response = await axios.post(
      `http://${host}:3008/user/${currentId}/subscribe`,
      payload
    );

    return response.data;
  } catch (error) {
    throw new Error("Failed to submit payload to the external API");
  }
};
