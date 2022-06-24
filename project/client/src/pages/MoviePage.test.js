import { render, screen } from "@testing-library/react";
import MoviePage from "./MoviePage";

test("renders learn react link", async () => {
  render(<MoviePage />);

  expect(await screen.findByText("Some movie title")).toBeInTheDocument();
});
