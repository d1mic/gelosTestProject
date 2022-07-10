import { render, screen } from "@testing-library/react";
import Book from "../components/Book.jsx";

test("Book unit test", () => {
  let book = {
    authors: "J.K. Rowling/Mary GrandPré",
    average_rating: 4.57,
    bookID: "1",
    isbn: "0439785960",
    isbn13: 9780439785969,
    language_code: "eng",
    num_pages: 652,
    publication_date: "9/16/2006",
    publisher: "Scholastic Inc.",
    ratings_count: 2095690,
    text_reviews_count: 27591,
    title: "Harry Potter",
  };
  render(<Book book={book}></Book>, document);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    book.title
  );
  let expectedYear = book.publication_date.split("/")[2];
  let expectedRating = book.average_rating * 2;
  expect(screen.getByText(expectedYear)).toBeInTheDocument();
  expect(screen.getByText(expectedRating)).toBeInTheDocument();
});
