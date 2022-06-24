import { Router } from "express";
import RatingController from "../controllers/ratings.js";

const ratingRouter = new Router();

ratingRouter.get("/ratings", RatingController.index);

export default ratingRouter;
