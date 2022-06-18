import { DataTypes } from 'sequelize'

const RatingSchema = {
  tconst: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  averageRating: {
    type: DataTypes.NUMBER,
  },
  numVotes: {
    type: DataTypes.INTEGER,
  },
}

export default RatingSchema