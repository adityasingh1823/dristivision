import axios from "axios";

const API = axios.create({
  baseURL: "https://dristivision-backend.onrender.com"
});

export const signup = (data) => API.post("/signup", data);
export const login = (data) => API.post("/login", data);

export const predict = (formData) =>
  API.post("/predict", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });