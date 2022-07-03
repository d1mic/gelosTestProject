import dbService from "../services/dbService.js";
import { loadBookModels } from "../models/index.js";

const { Books, Op } = await loadBookModels(dbService);

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

const search = async (req, res) => {
  const pageNum = parseInt(req.query.page) || 0;
  const itemsPerPage = parseInt(req.query.size) || 8;
  const queryName = req.query.query;

  try {
    let { count, rows } = await Books.findAndCountAll({
      where: {
        title: { [Op.substring]: queryName },
      },
      offset: pageNum * itemsPerPage,
      limit: itemsPerPage,
    });
    console.log(rows);
    res.status(200);
    res.json({
      meta: { count, pageNum, itemsPerPage },
      data: rows,
    });
  } catch (err) {
    res.status(500);
  }
};

export default { index, search };
