const { expect } = require("@playwright/test");

/**
 * Verifies if movie has the expected types
 * @param {*} movieObj
 */
module.exports.verifyMovieTypes = (movieObj) => {
  let movieObjExpectedTypes = {
    tconst: "string",
    titleType: "string",
    primaryTitle: "string",
    originalTitle: "string",
    isAdult: "boolean",
    startYear: "number",
    runtimeMinutes: "number",
    genres: "string",
  };

  for (const key in movieObjExpectedTypes) {
    expect(
      typeof movieObj[key],
      `Expected ${key} to be type of ${movieObjExpectedTypes[key]}`
    ).toBe(movieObjExpectedTypes[key]);
  }
};

/**
 * Verifies if book has the expected types
 * @param {*} bookObj
 */
module.exports.verifyBookTypes = (movieObj) => {
  let movieObjExpectedTypes = {
    bookID: "number",
    title: "string",
    authors: "string",
    average_rating: "number",
    isbn: "string",
    isbn13: "number",
    language_code: "string",
    num_pages: "number",
    ratings_count: "number",
    text_reviews_count: "number",
    publication_date: "string",
    publisher: "string",
  };

  for (const key in movieObjExpectedTypes) {
    expect(
      typeof movieObj[key],
      `Expected ${key} to be type of ${movieObjExpectedTypes[key]}`
    ).toBe(movieObjExpectedTypes[key]);
  }
};

module.exports.verifyMovieLimits = (
  movieObj,
  minStartYear = 1960,
  adultMoviesPermited = false
) => {
  expect(
    movieObj.startYear,
    `Start year should be greater than or equal to ${minStartYear}`
  ).toBeGreaterThanOrEqual(minStartYear);

  if (!adultMoviesPermited)
    expect(movieObj.isAdult, "Adult movies not permited on the site").toBe(
      false
    );
};

/**
 * Verifies if the rating follows the avg rating and num of votes minimum rules
 * @param {*} rating
 * @param {*} avgRatingMin
 * @param {*} numVotesMin
 */
module.exports.verifyMovieRatingLimits = (rating, avgRatingMin = 6) => {
  expect(
    rating.averageRating,
    "Average rating should be greater than or equal to 6"
  ).toBeGreaterThanOrEqual(avgRatingMin);
};

/**
 * Verifies if the meta values have the correct values
 * @param {*} metaValues
 * @param {*} expectedPage
 * @param {*} expectedItemsPerPage
 */
module.exports.verifyMetaValues = (
  metaValues,
  expectedPage,
  expectedItemsPerPage
) => {
  expect(
    typeof metaValues.count,
    "Expected count values to be type of number"
  ).toBe("number");

  expect(
    typeof metaValues.itemsPerPage,
    `Expected itemsPerPage to be type of number"`
  ).toBe("number");

  expect(
    typeof metaValues.pageNum,
    "Expected pageNum to be type of number"
  ).toBe("number");

  expect(
    metaValues.count,
    "Expected count to be greater than 0"
  ).toBeGreaterThan(0);

  expect(metaValues.pageNum, `Expected pageNum to be ${expectedPage}`).toBe(
    expectedPage
  );

  expect(
    metaValues.itemsPerPage,
    `Expected itemsPerPage to be ${expectedItemsPerPage}`
  ).toBe(expectedItemsPerPage);
};

module.exports.getRandomFloat = (min, max, decimals) => {
  const str = (Math.random() * (max - min) + min).toFixed(decimals);
  return parseFloat(str);
};
