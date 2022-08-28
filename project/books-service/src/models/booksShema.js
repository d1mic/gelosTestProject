import { DataTypes } from "sequelize";

const BookShema = {
  bookID: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
  },
  authors: {
    type: DataTypes.STRING,
  },
  average_rating: {
    type: DataTypes.NUMBER,
    max: 5,
    min: 1,
  },
  isbn: {
    type: DataTypes.STRING,
  },
  isbn13: {
    type: DataTypes.NUMBER,
  },
  language_code: {
    type: DataTypes.STRING,
  },
  num_pages: {
    type: DataTypes.INTEGER,
  },
  ratings_count: {
    type: DataTypes.INTEGER,
  },
  text_reviews_count: {
    type: DataTypes.INTEGER,
  },
  publication_date: {
    type: DataTypes.STRING,
  },
  publisher: {
    type: DataTypes.STRING,
  },
};

export default BookShema;
