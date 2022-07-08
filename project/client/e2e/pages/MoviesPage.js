const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class MoviesPage extends BasePage {
  constructor(page) {
    super(page);
    this.movieCard = page.locator('[datatest-id="movie"]');
    this.moviePageComponent = page.locator("_react=MoviePage");
    this.movieSearchField = page.locator("#default-search");
    this.movieTitleSelector = "h1";
    this.movieCategory = ".category";
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

  /**
   * Gets the number of movies presented on the current page
   * @returns {Promise<number>}
   */
  async getNumOfMoviesOnPage() {
    await this.movieCard.first().waitFor();
    return this.movieCard.count();
  }

  /**
   * Gets the total number of movies from the pagination
   * @returns
   */
  getTotalNumOfMovies() {
    return this.getTotalPaginationNumber();
  }

  /**
   * Verifies that the number of movies on the current page is less than initial number
   * @param {number} initialNum
   */
  async verifyNumOfMoviesOnPageLessThen(initialNum) {
    let currentNumOfmovies = await this.getNumOfMoviesOnPage();
    expect(
      currentNumOfmovies,
      `Expected number of movies on a page to be less then ${initialNum}`
    ).toBeLessThan(initialNum);
  }

  /**
   * Verifies that the total number of movies in the pagination is less than initial number
   * @param {number} initialNum
   */
  async verifyTotalNumOfMoviesLessThen(initialNum) {
    let totalNumOfResults = await this.getTotalNumOfMovies();
    expect(
      totalNumOfResults,
      `Expected total number of movies to be less then ${initialNum}`
    ).toBeLessThan(initialNum);
  }

  /**
   * Verifies that the number of movies on the current page is equal to the expected value
   * @param {number} expectedValue
   */
  async verifyNumOfMoviesOnPageEquals(expectedValue) {
    let currentNumOfmovies = await this.getNumOfMoviesOnPage();
    expect(
      currentNumOfmovies,
      `Expected number of movies on a page to equal ${expectedValue}`
    ).toEqual(expectedValue);
  }

  /**
   * Verifies that the total number of movies is equal to the expected value
   * @param {number} expectedValue
   */
  async verifyTotalNumOfMoviesEqual(expectedValue) {
    let totalNumOfResults = await this.getTotalNumOfMovies();
    expect(
      totalNumOfResults,
      `Expected total number of movies to equal ${expectedValue}`
    ).toEqual(expectedValue);
  }

  /**
   * Gets a movie locator based on the index provided
   * @param {number} index
   * @returns {locator}
   */
  async getMovie(index) {
    if (index === -1) {
      return this.movieCard.last();
    }
    return this.movieCard.nth(index);
  }

  /**
   * Gets movie title from the movie with selected index
   * @param {number} index
   * @returns
   */
  async getMovieTitle(index) {
    let movieLocator = await this.getMovie(index);
    return movieLocator.locator(this.movieTitleSelector).innerText();
  }

  /**
   * Verifies the movie title contains the expectedTitle text
   * @param {number} index - index of movie on the movie page
   * @param {string} expectedTitle - expected title value
   */
  async verifyMovieTitle(index, expectedTitle) {
    let movieTitle = await this.getMovieTitle(index);
    expect(
      movieTitle.toLowerCase().includes(expectedTitle.toLowerCase()),
      `Seach query ${expectedTitle.toLowerCase()} not included in search result: ${movieTitle.toLowerCase()}`
    ).toBeTruthy();
  }
}

module.exports = { MoviesPage };
