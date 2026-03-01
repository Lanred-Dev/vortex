import express from "express";
import cors from "cors";

export const app = express();
app.use(cors());

import "./http/server.js";
import "./io/server.js";