import { render, screen } from "@testing-library/react";
import MoviePage from "./pages/MoviePage";

test("renders learn react link", async () => {
  render(<MoviePage />);

  expect(await screen.findByText("Interesting movie title")).toBeInTheDocument();
});

test("Seach bar exists", async () => {
  render(<MoviePage />);

  let searchBar = await screen.findByPlaceholderText(
    "Search by title"
  );
  expect(searchBar).toBeInTheDocument();
});
