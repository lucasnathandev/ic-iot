import axios from "axios";

const origin = import.meta.env.VITE_API_ORIGIN || "http://localhost:8000";

const generalHeaders = {
  "Content-Type": "application/json",
};

export const authAPI = axios.create({ baseURL: origin + "/auth" });

export const boxAPI = axios.create({
  baseURL: origin + "/iot-box",
  headers: {
    Authorization: localStorage.getItem("jwt"),

    ...generalHeaders,
  },
});
