import express from "express";
import cors from "cors";
import generalRouter from "./routers/general.js";
import booksRouter from "./routers/books.js";

const server = express();
server.use(express.json());

server.use(cors());
server.use("/api/v1", generalRouter);
server.use("/api/v1", booksRouter);

export default server;
