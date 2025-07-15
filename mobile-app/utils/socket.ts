import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../.ipConfig";

let socket: Socket | null = null;

export function getSocket() {
  if (!socket) {
    socket = io(SERVER_URL);
  }
  return socket;
}
