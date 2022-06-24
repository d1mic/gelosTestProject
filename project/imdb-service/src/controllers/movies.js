import { loadModels } from "../models/index.js";
import dbService from "../services/dbService.js";

const { Title, Rating } = await loadModels(dbService);

/**
 * Controller for getting all movie titles
 */
const index = async (req, res) => {
  const pageNum = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.size) || 8;

  try {
    let count = await Title.count({ col: "tconst" });
    let movies = await Title.findAll({
      include: {
        model: Rating,
        attributes: {
          exclude: "tconst",
        },
      },
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
 * Controller for getting a specific movie title
 * */
const show = async (req, res) => {
  const movieId = req.params.id;

  try {
    const movieData = await Title.findByPk(movieId);
    res.status(200);
    res.json({
      data: movieData,
    });
  } catch (err) {
    res.status(500);
  }
};

export default { index, show };
