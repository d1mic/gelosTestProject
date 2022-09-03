import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Unit tests for index handler", function () {
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
});
