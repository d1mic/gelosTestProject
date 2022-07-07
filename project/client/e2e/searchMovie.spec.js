// @ts-check
const { test } = require("@playwright/test");
const { MoviesPage } = require("./pages/MoviesPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/movies");
});

test.describe("Search movie tests", () => {
  test("No results search query", async ({ page }) => {
    const moviesPage = new MoviesPage(page);
    await moviesPage.search("some invalid text thats not a movie");
    await moviesPage.verifyNotFoundImage();
  });

  test("Valid search query - full page result", async ({ page }) => {
    const moviesPage = new MoviesPage(page);
    let numOfMovies = await moviesPage.getNumOfMoviesOnPage();
    let totalNumOfResults = await moviesPage.getTotalNumOfMovies();
    await moviesPage.search("Batman");
    await moviesPage.verifyNumOfMoviesOnPageEquals(numOfMovies);
    await moviesPage.verifyTotalNumOfMoviesLessThen(totalNumOfResults);
  });

  test("Valid search query - partial page result", async ({ page }) => {
    const moviesPage = new MoviesPage(page);
    let numOfMovies = await moviesPage.getNumOfMoviesOnPage();
    await moviesPage.search("Inception");
    await moviesPage.verifyNumOfMoviesOnPageLessThen(numOfMovies);
    let numOfMoviesOnPage = await moviesPage.getNumOfMoviesOnPage();
    await moviesPage.verifyTotalNumOfMoviesEqual(numOfMoviesOnPage);
  });

  test("Empty search query", async ({ page }) => {
    const moviesPage = new MoviesPage(page);
    let initialNumOfMovies = await moviesPage.getTotalNumOfMovies();
    await moviesPage.search("Something");
    await moviesPage.verifyTotalNumOfMoviesLessThen(initialNumOfMovies);
    await moviesPage.search("");
    await moviesPage.verifyTotalNumOfMoviesEqual(initialNumOfMovies);
  });
});
