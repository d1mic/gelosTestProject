import BooksController from "../src/controllers/books";
import httpMocks from "node-mocks-http";

describe("Unit tests for edit rating handler", function () {
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
