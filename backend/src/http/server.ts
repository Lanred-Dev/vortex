import { createServer } from "node:http";
import { app } from "../index.js";

const PORT: number = parseInt(process.env.PORT!);

export const httpServer = createServer(app);

httpServer.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

import "./router.js";