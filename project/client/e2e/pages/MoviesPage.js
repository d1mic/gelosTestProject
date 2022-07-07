const { expect } = require("@playwright/test");

class MoviesPage {
  constructor(page) {
    this.page = page;
    this.movieCard = page.locator('[datatest-id="movie"]');
    this.moviePageComponent = page.locator("_react=MoviePage");
    this.movieSearchField = page.locator("#default-search");
    this.notFoundImg = page.locator('img[alt="NOT FOUND"]');
    this.paginationText = page.locator("#pagination");
    this.totalNumOfResults = this.paginationText.locator(
      "[data-testid='numofResults']"
    );
    this.movieTitle = this.movieCard.locator("h1");
    this.movieCategory = this.movieCard.locator(".category");
    this.loader = page.locator('[datatest-id="loader"]');
  }

  /**
   * Verifies that the url contains /movies
   */
  async verifyURL() {
    await expect(
      this.page,
      "Invalid url shown when trying to navigate to movies page"
    ).toHaveURL(/.*movies/);
  }

  /**
   * Verifies that the movie page is presented correctly
   */
  async verifyMoviePage() {
    await expect(
      this.moviePageComponent,
      'Movie page not showing up correctly"'
    ).toBeVisible();
  }

  async search(query) {
    await this.movieSearchField.fill(query);
    await this.movieSearchField.press("Enter");
    await this.movieSearchField.waitFor();
  }

  async verifyNotFoundImage() {
    await expect(this.notFoundImg).toBeVisible();
  }

  async verifyNoResultsText() {
    await expect(this.paginationText).toContainText("No results");
  }

  async getNumOfMoviesOnPage() {
    await this.movieCard.first().waitFor();
    return this.movieCard.count();
  }

  async getTotalNumOfMovies() {
    await this.totalNumOfResults.waitFor();
    return parseInt(await this.totalNumOfResults.innerText());
  }

  async verifyNumOfMoviesOnPageLessThen(initialNum) {
    let currentNumOfmovies = await this.getNumOfMoviesOnPage();
    await expect(currentNumOfmovies).toBeLessThan(initialNum);
  }

  async verifyTotalNumOfMoviesLessThen(initialNum) {
    let totalNumOfResults = await this.getTotalNumOfMovies();
    await expect(totalNumOfResults).toBeLessThan(initialNum);
  }

  async verifyNumOfMoviesOnPageEquals(expectedValue) {
    let currentNumOfmovies = await this.getNumOfMoviesOnPage();
    await expect(currentNumOfmovies).toEqual(expectedValue);
  }

  async verifyTotalNumOfMoviesEqual(initialNum) {
    let totalNumOfResults = await this.getTotalNumOfMovies();
    await expect(totalNumOfResults).toEqual(initialNum);
  }

  async verifyFirstMovieCard() {
    await expect(this.movieCard.nth(0)).toBeVisible();
  }
}

module.exports = { MoviesPage };
