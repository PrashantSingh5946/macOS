import { io } from "socket.io-client";

const socket = io(
  window.location.protocol == "http:"
    ? "ws://" + window.location.host
    : "wss://" + window.location.host
);

export default socket;
