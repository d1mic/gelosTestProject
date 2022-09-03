import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Unit tests for delete book handler", function () {
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
});
