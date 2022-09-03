import { DataTypes } from "sequelize";

const titleSchema = {
  tconst: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  titleType: {
    type: DataTypes.STRING,
  },
  primaryTitle: {
    type: DataTypes.STRING,
  },
  originalTitle: {
    type: DataTypes.STRING,
  },
  isAdult: {
    type: DataTypes.BOOLEAN,
  },
  startYear: {
    type: DataTypes.INTEGER,
  },
  endYear: {
    type: DataTypes.INTEGER,
  },
  runtimeMinutes: {
    type: DataTypes.INTEGER,
  },
  genres: {
    type: DataTypes.STRING,
  },
};

export default titleSchema;
