import { Router } from "express";
import MovieController from '../controllers/movies.js'

const moviesRouter = new Router();

moviesRouter.get("/movies", MovieController.index);
moviesRouter.get("/movies/search", MovieController.search)
moviesRouter.get("/movies/:id", MovieController.show);

export default moviesRouter;
