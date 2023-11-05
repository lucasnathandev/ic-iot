import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_ORIGIN || "http://localhost:8000");

socket.on("connect", () => {
  console.log("connected");
});

socket.on("box-data", (...args) => {
  console.log(args);
});

export const useSocket = () => socket;
