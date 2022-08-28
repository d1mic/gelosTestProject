import { Router } from "express";
import BooksController from "../controllers/books.js";

const booksRouter = new Router();
booksRouter.get("/books/search", BooksController.search);
booksRouter.post("/books", BooksController.create);
booksRouter.delete("/books/:id", BooksController.deleteBook);
booksRouter.put("/books/:id", BooksController.editRating);
booksRouter.get("/books", BooksController.index);

export default booksRouter;
