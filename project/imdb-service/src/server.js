import express from "express";
import generalRouter from "./routers/general.js";
import moviesRouter from "./routers/movies.js";

const server = express();

// add routes
server.use('/api/v1', generalRouter);
server.use('/api/v1', moviesRouter);

export default server