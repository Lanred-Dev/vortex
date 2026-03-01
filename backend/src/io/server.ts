import { Server } from "socket.io";
import { httpServer } from "../http/server.js";

export const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
    transports: ["websocket"],
});

import "./router.js"