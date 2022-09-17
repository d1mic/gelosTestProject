/* eslint-disable jest/valid-expect */
const { test, expect } = require("@playwright/test");
const {
  verifyMovieRatingLimits,
  verifyMovieTypes,
  verifyMetaValues,
  verifyMovieLimits,
  getRandomFloat,
  getDifferentRandomRating,
} = require("./helpers/assertions");

test.describe("Movies api integration tests", () => {
  const baseUrl = "http://localhost:4000";
  const defaultItemsPerPage = 8;
  const defaultPage = 0;

  test("Get movies test - Invalid url", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/v1/movie`);
    expect(response.status()).toBe(404);
  });

  test("Get movies test - no parameters", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/v1/movies`);
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, defaultPage, defaultItemsPerPage);

    let movies = responseBody.data.movies;
    expect(movies.length).toBe(defaultItemsPerPage);
    movies.forEach((movie) => {
      verifyMovieTypes(movie);
      verifyMovieLimits(movie);
      verifyMovieRatingLimits(movie.Rating);
    });
  });

  test("Get movies test - page parameter specified", async ({ request }) => {
    const expectedPage = 3;
    const response = await request.get(`${baseUrl}/api/v1/movies`, {
      params: { page: expectedPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, expectedPage, defaultItemsPerPage);

    let movies = responseBody.data.movies;
    expect(movies.length).toBe(defaultItemsPerPage);
    movies.forEach((movie) => {
      verifyMovieTypes(movie);
      verifyMovieLimits(movie);
      verifyMovieRatingLimits(movie.Rating);
    });
  });

  test("Get movies test - items per page parameter", async ({ request }) => {
    const expectedItemsPerPage = 5;
    const response = await request.get(`${baseUrl}/api/v1/movies`, {
      params: { size: expectedItemsPerPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, defaultPage, expectedItemsPerPage);
    let movies = responseBody.data.movies;
    expect(movies.length).toBe(expectedItemsPerPage);
    movies.forEach((movie) => {
      verifyMovieTypes(movie);
      verifyMovieLimits(movie);
      verifyMovieRatingLimits(movie.Rating);
    });
  });

  test("Get movies test - all parameters", async ({ request }) => {
    const expectedPage = 6;
    const expectedItemsPerPage = 10;
    const response = await request.get(`${baseUrl}/api/v1/movies`, {
      params: { page: expectedPage, size: expectedItemsPerPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, expectedPage, expectedItemsPerPage);
    let movies = responseBody.data.movies;
    expect(movies.length).toBe(expectedItemsPerPage);
    movies.forEach((movie) => {
      verifyMovieTypes(movie);
      verifyMovieLimits(movie);
      verifyMovieRatingLimits(movie.Rating);
    });
  });

  test("Get specific movie", async ({ request }) => {
    const allMoviesResponse = await request.get(`${baseUrl}/api/v1/movies`);
    const allMovies = JSON.parse(await allMoviesResponse.text());
    const selectedMovie = allMovies.data.movies[0];

    const response = await request.get(
      `${baseUrl}/api/v1/movies/${selectedMovie.tconst}`
    );
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMovieTypes(responseBody.data);
    expect(responseBody.data.tconst).toBe(selectedMovie.tconst);
    expect(responseBody.data.primaryTitle).toBe(selectedMovie.primaryTitle);
  });

  test("Edit specific movie", async ({ request }) => {
    const specificMovie = "tt0056048";
    const expectedRating = getRandomFloat(5, 10, 2);

    const editMovie = await request.put(
      `${baseUrl}/api/v1/movies/${specificMovie}`,
      { data: { rating: expectedRating } }
    );
    expect(editMovie.status()).toBe(200);
    const editMovieResponse = JSON.parse(await editMovie.text());
    let editedRating = editMovieResponse.data.averageRating;
    expect(editedRating, "Rating did not update properly").toBe(expectedRating);

    const getMovie = await request.get(
      `${baseUrl}/api/v1/movies/${specificMovie}`
    );
    expect(getMovie.status()).toBe(200);
    const getMovieResponse = JSON.parse(await getMovie.text());
    verifyMovieTypes(getMovieResponse.data);
    let currentRating = getMovieResponse.data.Rating.averageRating;
    expect(currentRating, "Rating did not update in the database").toBe(
      expectedRating
    );
  });
});
