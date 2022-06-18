import { Model } from "sequelize";
import RatingSchema from "./ratingShema.js";
import TitleSchema from "./titleShema.js";

class Title extends Model {}
class Rating extends Model {}

const initTitleModel = async (dbService) => {
  const options = {
    sequelize: dbService,
    modelName: "Title",
    tableName: "title_basics",
    timestamps: false,
  };
  Title.init(TitleSchema, options);
};

const initRatingModel = async (dbService) => {
  const options = {
    sequelize: dbService,
    modelName: "Rating",
    tableName: "title_ratings",
    timestamps: false,
  };
  Rating.init(RatingSchema, options);
};

export const loadModels = async (dbService) => {
  console.log("Loading models...");

  await initTitleModel(dbService);
  await initRatingModel(dbService);

  console.log("Succesfully loaded models.");

  return {
    Title,
  };
};
