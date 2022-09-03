import MovieController from "../src/controllers/movies";
import httpMocks from "node-mocks-http";

describe("Unit tests for delete book handler", function () {
  test("Delete handler", async () => {
    const req = httpMocks.createRequest({
      method: "DELETE",
      params: {
        id: "tt0053472",
      },
    });
    const res = httpMocks.createResponse();

    await MovieController.deleteMovie(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    let expectedDeleted = 0;
    expect(resData.numOfDeletedRatings).toBe(expectedDeleted);
    expect(resData.numOfDeletedTitles).toBe(expectedDeleted);
  });

  test("Delete handler - invalid request", async () => {
    const req = httpMocks.createRequest({});
    const res = httpMocks.createResponse();
    await MovieController.deleteMovie(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
