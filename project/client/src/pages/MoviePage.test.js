import { render, screen } from "@testing-library/react";
import MoviePage from "./MoviePage";

test("renders learn react link", async () => {
  render(<MoviePage />);

  expect(await screen.findByText("Some movie title")).toBeInTheDocument();
});

test("Seach bar exists", async () => {
  render(<MoviePage />);

  let searchBar = await screen.findByPlaceholderText(
    "Search by name, category..."
  );
  expect(searchBar).toBeInTheDocument();
});
