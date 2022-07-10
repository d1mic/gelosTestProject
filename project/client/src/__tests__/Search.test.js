import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar.jsx";

test("Search bar unit test", async () => {
  render(<SearchBar></SearchBar>);
  let searchField = screen.getByPlaceholderText("Search by title");
  let searchButton = screen.getByRole('button')
  
  expect(searchField).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  fireEvent.change(searchField, { target: { value: "Some random query" } });
  expect(searchField.value).toBe("Some random query");
});
