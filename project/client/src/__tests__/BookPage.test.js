import { fireEvent, render, screen } from "@testing-library/react";
import BookPage from "../pages/BookPage.jsx";

test("Book component test - search for values", async () => {
  render(<BookPage></BookPage>);

  expect(screen.getByTestId("loader")).toBeInTheDocument();

  const firstMovieTitle = await screen.findByText("Some book title");
  const secondMovieTitle = await screen.findByText("Some other book title");
  expect(firstMovieTitle).toBeInTheDocument();
  expect(secondMovieTitle).toBeInTheDocument();

  const query = "Hello world";
  let searchField = screen.getByPlaceholderText("Search by title");
  expect(searchField).toBeInTheDocument();

  fireEvent.change(searchField, { target: { value: query } });
  expect(searchField.value).toBe(query);
  const searchButton = screen.getByRole("button", { name: /search/i });
  fireEvent.click(searchButton);
  expect(
    await screen.findByText(`Book with title: ${query}`)
  ).toBeInTheDocument();
});
