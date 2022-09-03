import { Router } from "express";
import MovieController from "../controllers/movies.js";

const moviesRouter = new Router();

moviesRouter.get("/movies", MovieController.index);
moviesRouter.get("/movies/search", MovieController.search);
moviesRouter.get("/movies/:id", MovieController.show);
moviesRouter.put("/movies/:id", MovieController.editRating);
moviesRouter.delete("/movies/:id", MovieController.deleteMovie);

export default moviesRouter;
