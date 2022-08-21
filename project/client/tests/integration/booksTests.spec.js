const { test, expect } = require("@playwright/test");
const { verifyBookTypes, verifyMetaValues } = require("./helpers/assertions");

test.describe("Books api integration tests", () => {
  const baseUrl = "http://localhost:4001";
  const defaultItemsPerPage = 8;
  const defaultPage = 0;

  test("Get books test - Invalid url", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/v1/boos`);
    expect(response.status()).toBe(404);
  });

  test("Get movies test - no parameters", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/v1/books`);
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());

    verifyMetaValues(responseBody.meta, defaultPage, defaultItemsPerPage);

    let books = responseBody.data;
    expect(books.length).toBe(defaultItemsPerPage);
    books.forEach((movie) => {
      verifyBookTypes(movie);
    });
  });

  test("Get books test - page parameter specified", async ({ request }) => {
    const expectedPage = 3;
    const response = await request.get(`${baseUrl}/api/v1/books`, {
      params: { page: expectedPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, expectedPage, defaultItemsPerPage);

    let books = responseBody.data;
    expect(books.length).toBe(defaultItemsPerPage);
    books.forEach((movie) => {
      verifyBookTypes(movie);
    });
  });

  test("Get books test - items per page parameter", async ({ request }) => {
    const expectedItemsPerPage = 5;
    const response = await request.get(`${baseUrl}/api/v1/books`, {
      params: { size: expectedItemsPerPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, defaultPage, expectedItemsPerPage);
    let books = responseBody.data;
    expect(books.length).toBe(expectedItemsPerPage);
    books.forEach((movie) => {
      verifyBookTypes(movie);
    });
  });

  test("Get books test - all parameters", async ({ request }) => {
    const expectedPage = 6;
    const expectedItemsPerPage = 10;
    const response = await request.get(`${baseUrl}/api/v1/books`, {
      params: { page: expectedPage, size: expectedItemsPerPage },
    });
    expect(response.status()).toBe(200);
    const responseBody = JSON.parse(await response.text());
    verifyMetaValues(responseBody.meta, expectedPage, expectedItemsPerPage);
    let books = responseBody.data;
    expect(books.length).toBe(expectedItemsPerPage);
    books.forEach((movie) => {
      verifyBookTypes(movie);
    });
  });

  test("Get specific book", async ({ request }) => {
    const allBooksResponse = await request.get(`${baseUrl}/api/v1/books`);
    const allBooks = JSON.parse(await allBooksResponse.text());
    const selectedBook = allBooks.data[0];

    const response = await request.get(
      `${baseUrl}/api/v1/movies/${selectedBook.bookID}`
    );
    expect(response.status()).toBe(404);
    // TODO:
  });
});
