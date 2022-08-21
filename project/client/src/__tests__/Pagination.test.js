import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../components/Pagination";

const resultsPerPage = 8;

test("Pagination - number of buttons", async () => {
  render(<Pagination numOfResults={1} pageNum={1}></Pagination>);
  const items = await screen.findAllByRole("button");
  expect(items).toHaveLength(2);
});

test("Pagination - button previous", () => {
  render(<Pagination numOfResults={1} pageNum={1}></Pagination>);
  expect(screen.getByRole("button", { name: /prev/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /prev/i })).toHaveTextContent(
    "Prev"
  );
});

test("Pagination - button next", () => {
  render(<Pagination numOfResults={1} pageNum={1}></Pagination>);
  expect(screen.getByRole("button", { name: /next/i })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: /next/i })).toHaveTextContent(
    "Next"
  );
});

test("Pagination - no results", () => {
  let numOfResults = 0;
  render(<Pagination numOfResults={numOfResults}></Pagination>);
  expect(
    screen.getByText("No results - try searching again")
  ).toBeInTheDocument();
});

test("Pagination - start number - first page results", () => {
  let numOfResults = 100;
  let pageNum = 0;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("startNum")).toHaveTextContent(1);
});

test("Pagination - end number - first page results", () => {
  let numOfResults = 100;
  let pageNum = 0;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("endingNum")).toHaveTextContent(resultsPerPage);
});

test("Pagination - total number - first page results", () => {
  let numOfResults = 100;
  let pageNum = 0;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("numofResults")).toHaveTextContent(numOfResults);
});

test("Pagination - start number - middle page results", () => {
  let numOfResults = 100;
  let pageNum = 2;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("startNum")).toHaveTextContent(
    pageNum * resultsPerPage + 1
  );
});

test("Pagination - end number - middle page results", () => {
  let numOfResults = 100;
  let pageNum = 2;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("endingNum")).toHaveTextContent(
    pageNum * resultsPerPage + 8
  );
});

test("Pagination - end number - last page result", () => {
  let numOfResults = 9;
  let pageNum = 1;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  expect(screen.getByTestId("endingNum")).toHaveTextContent(numOfResults);
});

test("Pagination - first page click prev", () => {
  let numOfResults = 2;
  let pageNum = 0;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  let nextButton = screen.getByRole("button", { name: /prev/i });
  fireEvent.click(nextButton);
  expect(screen.getByTestId("startNum")).toHaveTextContent(1);
});

test("Pagination - last page click next", () => {
  let numOfResults = 9;
  let pageNum = 1;

  render(
    <Pagination numOfResults={numOfResults} pageNum={pageNum}></Pagination>
  );
  let nextButton = screen.getByRole("button", { name: /next/i });
  fireEvent.click(nextButton);
  expect(screen.getByTestId("endingNum")).toHaveTextContent(numOfResults);
});
