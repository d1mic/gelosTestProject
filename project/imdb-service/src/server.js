import express from "express";
import cors from "cors";
import generalRouter from "./routers/general.js";
import moviesRouter from "./routers/movies.js";

const server = express();

server.use(cors());
// add routes
server.use("/api/v1", generalRouter);
server.use("/api/v1", moviesRouter);

export default server;
