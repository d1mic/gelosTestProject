import { DataTypes } from "sequelize";

const BookShema = {
  bookID: {
    type: DataTypes.STRING,
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
    type: DataTypes.DATE,
  },
  publisher: {
    type: DataTypes.STRING,
  },
};

export default BookShema;
