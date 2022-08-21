import { fireEvent, render, screen } from "@testing-library/react";
import SearchBar from "../components/SearchBar.jsx";

test("Search bar - regular search test", async () => {
  render(<SearchBar></SearchBar>);
  let searchField = screen.getByPlaceholderText("Search by title");
  let searchButton = screen.getByRole("button");

  expect(searchField).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  let findValue = "Some random query";

  fireEvent.change(searchField, { target: { value: findValue } });
  expect(searchField.value).toBe(findValue);
});

test("Search bar - empty search test", async () => {
  render(<SearchBar></SearchBar>);
  let searchField = screen.getByPlaceholderText("Search by title");
  let searchButton = screen.getByRole("button");

  expect(searchField).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  fireEvent.change(searchField, { target: { value: "" } });
  expect(searchField.value).toBe("");
});

test("Search bar - number search test", async () => {
  render(<SearchBar></SearchBar>);
  let searchField = screen.getByPlaceholderText("Search by title");
  let searchButton = screen.getByRole("button");

  expect(searchField).toBeInTheDocument();
  expect(searchButton).toBeInTheDocument();

  let findValue = "input containing nums 12344332";
  fireEvent.change(searchField, { target: { value: findValue } });
  expect(searchField.value).toBe(findValue);
});
