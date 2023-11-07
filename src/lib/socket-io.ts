import { io } from "socket.io-client";

export function useSocket() {
  const socket = io(
    import.meta.env.VITE_WS_API_ORIGIN || "http://localhost:8000/iot-box"
  );
  socket.on("connect", () => {
    console.log("connected");
  });

  return socket;
}
