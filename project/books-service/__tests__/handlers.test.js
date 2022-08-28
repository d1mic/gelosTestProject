import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Test Handlers for books microservice", function () {
  test("Index handler - valid request", async () => {
    const req = httpMocks.createRequest({ method: "GET", url: "/books" });
    const res = httpMocks.createResponse();

    await BooksController.index(req, res);

    let resData = res._getJSONData();
    let resStatus = res._getStatusCode();

    let metaData = resData.meta;
    let realData = resData.data;

    expect(resStatus).toBe(200);

    expect(typeof metaData.count).toBe("number");
    expect(metaData.itemsPerPage).toBe(8);
    expect(metaData.pageNum).toBe(0);

    expect(realData).toHaveLength(metaData.itemsPerPage);
    realData.forEach((element) => {
      expect(element).toHaveProperty("bookID");
      expect(element).toHaveProperty("title");
    });
  });

  test("Index handler - invalid parameters", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/",
      query: { page: "invalid page", size: "invalid size" },
    });
    const res = httpMocks.createResponse();
    await BooksController.index(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });

  test("Search handler - valid request", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/search",
      query: {
        query: "Harry",
      },
    });
    const res = httpMocks.createResponse();

    await BooksController.search(req, res);

    let resData = res._getJSONData();
    let resStatus = res._getStatusCode();

    let metadata = resData.meta;
    let searchData = resData.data;

    expect(resStatus).toBe(200);
    expect(typeof metadata.count).toBe("number");
    expect(searchData.length).toBeGreaterThan(0);
    searchData.forEach((element) => {
      expect(element).toHaveProperty("bookID");
    });
  });

  test("Seach handler - no response to /search ", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/search",
      query: { query: 5 },
    });
    const res = httpMocks.createResponse();

    await BooksController.search(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });

  test("Create handler - valid book", async () => {
    const expectedBook = {
      title: "Best book ever",
      authors: "Pera",
      average_rating: 4.5,
      isbn: "112313123231",
      isbn13: 12323123123212,
      language_code: "eng",
      num_pages: 200,
      ratings_count: 213,
      text_reviews_count: 21,
      publication_date: "12/12/2019",
      publisher: "Some publisher",
    };

    const req = httpMocks.createRequest({
      method: "POST",
      body: expectedBook,
    });
    const res = httpMocks.createResponse();

    await BooksController.create(req, res);
    let resStatus = res._getStatusCode();
    let resBody = res._getJSONData();

    expect(resStatus).toBe(200);
    let createdBook = resBody.data;
    expect(createdBook.title).toBe(expectedBook.title);
    expect(createdBook.average_rating).toBe(expectedBook.average_rating);
    expect(createdBook.authors).toBe(expectedBook.authors);
    expect(createdBook.isbn).toBe(expectedBook.isbn);
    expect(createdBook.isbn13).toBe(expectedBook.isbn13);
  });

  test("Create handler - invalid book", async () => {
    const req = httpMocks.createRequest({
      method: "POST",
      body: {
        isbn: "112313123231",
        missingALot: "true",
      },
    });
    const res = httpMocks.createResponse();

    await BooksController.create(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(400);
  });

  test("Create handler - invalid request", async () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();

    await BooksController.create(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(400);
  });

  test("Delete handler", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      params: {
        id: "112",
      },
    });
    const res = httpMocks.createResponse();

    await BooksController.deleteBook(req, res);

    let resData = res._getJSONData();
    let resStatus = res._getStatusCode();
    expect(resData.numOfDeletedItems).toBe(0);
    expect(resStatus).toBe(200);
  });

  test("Delete handler - invalid request", async () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();
    await BooksController.deleteBook(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });

  test("Edit handler", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      params: {
        id: "1",
      },
      body: {
        rating: 4.6,
      },
    });
    const res = httpMocks.createResponse();

    await BooksController.editRating(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    expect(resData.data.average_rating).toBe(4.6);
    expect(resData.data.ratings_count).toBe(1);
  });

  test("Edit handler - invalid request", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      body: {
        rating: 4.6,
      },
    });
    const res = httpMocks.createResponse();
    await BooksController.editRating(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
