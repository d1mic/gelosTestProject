import Sequelize from "sequelize";
import "dotenv/config";


const configuration = {
  dialect: "sqlite",
  storage: process.env.DB_CONNECTION,
};

const sequelize = new Sequelize(null, null, null, configuration);
export default sequelize;
