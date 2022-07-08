// @ts-check
const { test } = require("@playwright/test");
const { MoviesPage } = require("./pages/MoviesPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/movies");
});

test.describe("Pagination tests", () => {
  test("Multiple page - next button", async ({ page }) => {
    let moviePage = new MoviesPage(page);
    await moviePage.search("movie");
    let totalNumOfMovies = await moviePage.getTotalNumOfMovies();
    let moviesOnPage = await moviePage.getNumOfMoviesOnPage();

    let expectedStartNum = 1;
    let expectedEndNum = moviesOnPage;
    while (expectedEndNum < totalNumOfMovies) {
      await moviePage.verifyPageStartNum(expectedStartNum);
      await moviePage.verifyPageEndNum(expectedEndNum);
      await moviePage.clickNext();
      expectedStartNum = expectedEndNum + 1;
      expectedEndNum = expectedEndNum + 8;
    }
    await moviePage.verifyPageEndNum(totalNumOfMovies);
  });

  test("Single page - next button not working", async ({ page }) => {
    let moviePage = new MoviesPage(page);
    await moviePage.search("Inception");
    let movieTitle = await moviePage.getMovieTitle(0);
    await moviePage.clickNext();
    await moviePage.verifyMovieTitle(0, movieTitle);
  });

  test("Previous button not working on first page", async ({ page }) => {
    let moviePage = new MoviesPage(page);
    let movieTitle = await moviePage.getMovieTitle(0);
    await moviePage.clickPrevious();
    await moviePage.verifyMovieTitle(0, movieTitle);
  });

  test("Next button not working on last page", async ({ page }) => {
    let moviePage = new MoviesPage(page);
    await moviePage.search("movie");
    await moviePage.navigateToLastPage();
    let movieTitle = await moviePage.getMovieTitle(0);
    await moviePage.clickNext();
    await moviePage.verifyMovieTitle(0, movieTitle);
  });
});
