import { render, screen } from "@testing-library/react";
import Book from "../components/Book.jsx";

const book = {
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

test("Book title test", () => {
  render(<Book book={book}></Book>, document);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    book.title
  );
});

test("Book expected year test", () => {
  render(<Book book={book}></Book>, document);
  let expectedYear = book.publication_date.split("/")[2];
  expect(screen.getByText(expectedYear)).toBeInTheDocument();
});

test("Book invalid expected year test", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["publication_date"] = "";
  const expectedValue = "N/A";
  render(<Book book={invalidBook}></Book>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Book expected rating test", () => {
  render(<Book book={book}></Book>, document);
  let expectedRating = book.average_rating * 2;
  expect(screen.getByText(expectedRating)).toBeInTheDocument();
});

test("Book invalid rating test - zero rating", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["average_rating"] = 0;
  const expectedValue = "N/A";
  render(<Book book={invalidBook}></Book>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Book invalid rating test - negative rating", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["average_rating"] = -2;
  const expectedValue = "N/A";
  render(<Book book={invalidBook}></Book>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Book invalid rating test - upper limit rating", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["average_rating"] = 6;
  const expectedValue = "N/A";
  render(<Book book={invalidBook}></Book>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Book publisher test", () => {
  render(<Book book={book}></Book>, document);
  expect(screen.getByText(book.publisher)).toBeInTheDocument();
});

test("Book invalid publisher test", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["publisher"] = "";
  render(<Book book={invalidBook}></Book>, document);
  expect(screen.getByText("Unknown")).toBeInTheDocument();
});

test("Book main author test", () => {
  render(<Book book={book}></Book>, document);
  let mainAuthor = book.authors.split("/")[0];
  expect(screen.getByTestId("bookText")).toHaveTextContent(mainAuthor);
});

test("Book main invalid author test", () => {
  let invalidBook = JSON.parse(JSON.stringify(book));
  invalidBook["authors"] = "";
  render(<Book book={invalidBook}></Book>, document);
  let mainAuthor = book.authors.split("/")[0];
  expect(screen.getByTestId("bookText")).not.toHaveTextContent(mainAuthor);
});

test.only("Book main num of pages test", () => {
  render(<Book book={book}></Book>, document);
  expect(screen.getByTestId("bookText")).toHaveTextContent(
    book.num_pages + " pages"
  );
});

test("Title in text", () => {
  render(<Book book={book}></Book>, document);
  expect(screen.getByTestId("bookText")).toHaveTextContent(`"${book.title}"`);
});
