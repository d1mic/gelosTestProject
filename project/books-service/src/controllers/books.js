import dbService from "../services/dbService.js";
import { loadBookModels } from "../models/index.js";

const { Books, Op } = await loadBookModels(dbService);

/**
 * Returns all books based on the page selected and items per page
 * @param {*} req - request to be sent (query parameters page and size)
 * @param {*} res - response to be returned , json
 */
const index = async (req, res) => {
  const pageNum = parseInt(req.query.page || 0);
  const itemsPerPage = parseInt(req.query.size) || 8;
  try {
    let count = await Books.count({ col: "bookID" });
    let books = await Books.findAll({
      limit: itemsPerPage,
      offset: pageNum * itemsPerPage,
    });
    res.status(200);
    res.json({ data: books, meta: { count, itemsPerPage, pageNum } });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Searches for the book depending on the query sent
 * @param {*} req - request to be sent (query parameters query, page and size)
 * @param {*} res - response to be returned, json
 */
const search = async (req, res) => {
  const pageNum = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.size) || 8;
  const queryName = req.query.query;

  try {
    if (typeof queryName != "string") {
      throw Error("Invalid query");
    }

    let { count, rows } = await Books.findAndCountAll({
      where: {
        title: { [Op.substring]: queryName },
      },
      offset: pageNum * itemsPerPage,
      limit: itemsPerPage,
    });
    res.status(200);
    res.json({
      meta: { count, pageNum, itemsPerPage },
      data: rows,
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Deletes the book based on the provided id
 * @param {*} req - request with parameter id
 * @param {*} res - response, json
 */
const deleteBook = async (req, res) => {
  try {
    let bookId = req.params.id;
    let numOfDeletedItems = await Books.destroy({
      where: {
        bookID: bookId,
      },
    });
    res.status(200);
    res.json({
      numOfDeletedItems,
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Create book with required fields
 * @param {*} req - request with body book
 * @param {*} res - response, json
 */
const create = async (req, res) => {
  try {
    let book = req.body;
    let reqProps = ["title", "authors", "isbn", "publisher"];
    let validObj = reqProps.every((prop) => {
      return prop in book;
    });

    if (validObj) {
      let addedBook = await Books.create(book);
      res.status(200);
      res.json({ data: addedBook });
    } else {
      res.status(400);
    }
  } catch (err) {
    res.status(500);
  }
};

/**
 * Edit rating of the book
 * @param {*} req - request with id and body with rating
 * @param {*} res - response, json
 */
const editRating = async (req, res) => {
  const bookId = req.params.id;
  const rating = req.body.rating;
  try {
    let bookData = await Books.findByPk(bookId);
    bookData.average_rating = rating;
    bookData.ratings_count = 1;
    bookData.save();
    res.status(200);
    res.json({
      data: bookData,
    });
  } catch (err) {
    res.status(500);
  }
};

export default { index, search, create, deleteBook, editRating };
