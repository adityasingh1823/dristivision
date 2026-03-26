import axios from "axios";

const API = "https://dristivision-backend.onrender.com";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await axios.post(`${API}/predict`, formData);
  return res.data;
};
