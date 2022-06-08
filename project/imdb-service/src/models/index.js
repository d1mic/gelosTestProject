import { Model } from "sequelize";
import TitleSchema from "./titleShema.js";

class Title extends Model {}

const initTitleModel = async (dbService) => {
  const options = {
    sequelize: dbService,
    modelName: "Title",
    tableName: "title_basics",
    timestamps: false,
  };
  Title.init(TitleSchema, options);
};

export const loadModels = async (dbService) => {
  console.log("Loading models...");
  
  await initTitleModel(dbService);

  console.log('Succesfully loaded models.')

  return {
    Title,
  };
};
