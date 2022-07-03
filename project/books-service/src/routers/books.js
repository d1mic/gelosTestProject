import { Router } from "express";
import BooksController from "../controllers/books.js";

const booksRouter = new Router();
booksRouter.get("/books/search", BooksController.search)
booksRouter.get("/books", BooksController.index);

export default booksRouter;
