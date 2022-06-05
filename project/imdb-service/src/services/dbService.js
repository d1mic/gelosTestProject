import Sequelize from "sequelize";

const configuration = {
  dialect: "sqlite",
  storage: process.env.DB_CONNECTION,
};

const sequelize = new Sequelize(null, null, null, configuration);
export default sequelize;
