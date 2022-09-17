import { fireEvent, render, screen } from "@testing-library/react";
import MoviePage from "../pages/MoviePage";

test("Book component test - search for values", async () => {
  render(<MoviePage></MoviePage>);

  expect(screen.getByTestId("loader")).toBeInTheDocument();

  const firstMovieTitle = await screen.findByText("Movie title for the test");
  const secondMovieTitle = await screen.findByText(
    "Movie title for some other test"
  );
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
    await screen.findByText(`Movie with title: Hello world`)
  ).toBeInTheDocument();
});
