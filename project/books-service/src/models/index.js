import { Model } from "sequelize";
import BookShema from "./booksShema.js";

class Books extends Model {}

const initBooksModel = async (dbService) => {
  const options = {
    sequelize: dbService,
    modelName: "Books",
    tableName: "books",
    timestamps: false,
  };
  Books.init(BookShema, options);
};

export const loadBookModels = async (dbService) => {
  console.log("Loading book models");
  await initBooksModel(dbService);
  console.log("Succesfully loaded book models.");

  return { Books };
};
