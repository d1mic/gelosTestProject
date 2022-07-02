import dbService from "../services/dbService.js";
import { loadBookModels } from "../models/index.js";

const { Books } = await loadBookModels(dbService);

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

export default { index };
