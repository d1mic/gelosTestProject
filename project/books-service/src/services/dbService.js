import Sequelize from "sequelize";
console.log(process.env.DB_CONNECTION);
const configuration = {
  dialect: "sqlite",
  storage: process.env.DB_CONNECTION,
};

const sequelize = new Sequelize(null, null, null, configuration);
export default sequelize;
