import { loadModels } from "../models/index.js";
import dbService from "../services/dbService.js";

const { Title, Rating, Op } = await loadModels(dbService);

/**
 * Returns all movie titles with their ratings
 * @param {*} req - request to be sent (query parameters page and size)
 * @param {*} res - response to be returned, json
 */
const index = async (req, res) => {
  const pageNum = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.size) || 8;

  try {
    if (pageNum < 0 || itemsPerPage < 0) {
      throw Error("Invalid parameters - cant have negative params");
    }

    let count = await Title.count({ col: "tconst" });
    let movies = await Title.findAll({
      include: {
        model: Rating,
        attributes: {
          exclude: "tconst",
        },
      },
      order: [["startYear", "DESC"]],
      offset: pageNum * itemsPerPage,
      limit: itemsPerPage,
    });

    res.status(200);
    res.json({
      meta: { count, pageNum, itemsPerPage },
      data: { movies },
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Delets the movie based on the provided id
 * @param {*} req
 * @param {*} res
 */
const deleteMovie = async (req, res) => {
  try {
    let movieId = req.params.id;
    let numOfDeletedTitles = await Title.destroy({
      where: {
        tconst: movieId,
      },
    });
    let numOfDeletedRatings = await Rating.destroy({
      where: {
        tconst: movieId,
      },
    });

    res.status(200);
    res.json({
      numOfDeletedTitles,
      numOfDeletedRatings,
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Returns movie title data (without rating) based on the id provided
 * @param {*} req
 * @param {*} res
 */
const show = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movieData = await Title.findByPk(movieId);
    if (!movieData) {
      throw Error("Invalid id format or value");
    }
    res.status(200);
    res.json({
      data: movieData,
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Edits rating
 * @param {*} req
 * @param {*} res
 */
const editRating = async (req, res) => {
  const movieId = req.params.id;
  const rating = req.body.rating;
  try {
    let movieRating = await Rating.findByPk(movieId);
    movieRating.averageRating = rating;
    movieRating.numVotes = 1;
    movieRating.save();
    res.status(200);
    res.json({
      data: movieRating,
    });
  } catch (err) {
    res.status(500);
  }
};

/**
 * Searches for the book depending on the query sent
 * @param {*} req
 * @param {*} res
 */
const search = async (req, res) => {
  const pageNum = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.size) || 8;
  const queryName = req.query.query;

  try {
    if (typeof queryName != "string") {
      throw Error("Invalid query");
    }

    let { count, rows } = await Title.findAndCountAll({
      include: {
        model: Rating,
        attributes: {
          exclude: "tconst",
        },
      },
      where: {
        primaryTitle: { [Op.substring]: queryName },
      },
      offset: pageNum * itemsPerPage,
      limit: itemsPerPage,
    });
    res.status(200);
    res.json({
      meta: { count, pageNum, itemsPerPage },
      data: { movies: rows },
    });
  } catch (err) {
    res.status(500);
  }
};

export default { index, show, search, deleteMovie, editRating };
