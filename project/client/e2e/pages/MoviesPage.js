const { expect } = require("@playwright/test");

class MoviesPage {
  constructor(page) {
    this.page = page;
    this.movieCard = page.locator('[datatest-id="movie"]');
    this.moviePageComponent = page.locator("_react=MoviePage");
    this.movieSearchField = page.locator("#default-search");
    this.movieTitle = this.movieCard.locator("h1");
    this.movieCategory = this.movieCard.locator(".category");
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

  async verifyFirstMovieCard() {
    await expect(this.movieCard.nth(0)).toBeVisible();
  }
}

module.exports = { MoviesPage };
