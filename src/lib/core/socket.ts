import socketClient from "socket.io-client";

//http://localhost:1000/
export default socketClient("http://localhost:1000/", {
    timeout: 10000,
});
