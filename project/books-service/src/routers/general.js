import { Router } from "express";
import GeneralController from "../controllers/general.js";

const generalRouter = new Router();

generalRouter.get("/version", GeneralController.version);

export default generalRouter;
