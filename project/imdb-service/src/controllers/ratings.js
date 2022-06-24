import { loadModels } from "../models/index.js";
import dbService from "../services/dbService.js";

const { Title, Rating } = await loadModels(dbService);

const index = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size) || 8;

  try {
    const count = await Rating.count({ col: "tconst" });
    console.log(count);
    const ratings = await Rating.findAll({
      include: [
        {
          model: Title,
          attributes: ["primaryTitle"],
        },
      ],
      offset: page * size,
      limit: size,
    });

    res.json({
      meta: {
        page,
        size,
        maxPages: Math.ceil(count / size),
        totalItems: count,
      },
      data: {
        ratings,
      },
    });
  } catch (error) {
    res.status(500);
  }
};

export default { index };
