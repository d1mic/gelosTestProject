import express from "express";
import generalRouter from "./routers/general.js";

const server = express();

// add routes
server.use('/api/v1', generalRouter);

export default server