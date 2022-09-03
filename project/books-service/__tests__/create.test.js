import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Unit tests for create book hander", function () {
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
});
