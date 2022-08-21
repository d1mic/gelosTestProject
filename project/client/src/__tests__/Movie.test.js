import { render, screen } from "@testing-library/react";
import Movie from "../components/Movie.jsx";

const movie = {
  tconst: "tt10083340",
  titleType: "movie",
  primaryTitle: "Movie title for the test",
  originalTitle: "Gangubai Kathiawadi",
  isAdult: false,
  startYear: 2022,
  endYear: "\\N",
  runtimeMinutes: 152,
  genres: "Biography,Crime,Drama",
  Rating: {
    averageRating: 7,
    numVotes: 47665,
  },
};

test("Movie title test", () => {
  render(<Movie movie={movie}></Movie>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
    movie.primaryTitle
  );
});

test("Movie year test", () => {
  render(<Movie movie={movie}></Movie>);
  expect(screen.getByText(movie.startYear)).toBeInTheDocument();
});

test("Movie invalid movie year - negative rating", () => {
  let invalidMovie = JSON.parse(JSON.stringify(movie));
  invalidMovie["startYear"] = "";
  const expectedValue = "N/A";
  render(<Movie movie={invalidMovie}></Movie>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Movie rating test", () => {
  render(<Movie movie={movie}></Movie>);
  expect(screen.getByText(movie.Rating.averageRating)).toBeInTheDocument();
});

test("Movie invalid rating year test - negative rating", () => {
  let invalidMovie = JSON.parse(JSON.stringify(movie));
  invalidMovie.Rating["averageRating"] = -19;
  const expectedValue = "N/A";
  render(<Movie movie={invalidMovie}></Movie>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Movie invalid rating year test - upper limit rating", () => {
  let invalidMovie = JSON.parse(JSON.stringify(movie));
  let invalidValue = 11;
  invalidMovie.Rating["averageRating"] = invalidValue;
  const expectedValue = "N/A";
  render(<Movie movie={invalidMovie}></Movie>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Movie runtime minutes test", () => {
  render(<Movie movie={movie}></Movie>);
  let expectedMinutes = movie.runtimeMinutes + " min";
  expect(screen.getByText(expectedMinutes)).toBeInTheDocument();
});

test("Movie invalid runtime minutes test", () => {
  let invalidMovie = JSON.parse(JSON.stringify(movie));
  invalidMovie["runtimeMinutes"] = -1;
  const expectedValue = "N/A min";
  render(<Movie movie={invalidMovie}></Movie>, document);
  expect(screen.getByText(expectedValue)).toBeInTheDocument();
});

test("Movie categories test", () => {
  render(<Movie movie={movie}></Movie>);
  let categories = movie.genres.replaceAll(",", "");
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
    categories
  );
});

test("Movie uncategorised test", () => {
  let invalidMovie = JSON.parse(JSON.stringify(movie));
  invalidMovie["genres"] = undefined;
  render(<Movie movie={invalidMovie}></Movie>);
  let expected = "uncategorised";
  expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(expected);
});
