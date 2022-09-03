import { DataTypes } from "sequelize";

const RatingSchema = {
  tconst: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  averageRating: {
    type: DataTypes.NUMBER,
  },
  numVotes: {
    type: DataTypes.INTEGER,
  },
};

export default RatingSchema;
