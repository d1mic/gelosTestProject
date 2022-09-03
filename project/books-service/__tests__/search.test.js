import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Unit tests for search handler", function () {
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
});
