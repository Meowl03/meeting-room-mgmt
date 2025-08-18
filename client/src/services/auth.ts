import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface IUser {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  phone: string;
}

export const login = (data: { emailOrUsername: string; password: string }) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

export const register = (data: {
  username: string;
  phone: string;
  fullName: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

export const getProfile = () => {
  return axios.get(`${API_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
