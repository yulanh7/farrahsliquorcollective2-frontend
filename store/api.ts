import axios from "axios";
import { Post, User } from "./types";

const api = axios.create({
  baseURL: "http://172.19.0.191:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Set the authorization token for authenticated requests
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

// Define your API functions
export const fetchPosts = () => api.get<Post[]>("/posts");
export const fetchUsers = () => api.get<User[]>("/users");
