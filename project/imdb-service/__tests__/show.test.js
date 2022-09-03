import MovieController from "../src/controllers/movies";
import httpMocks from "node-mocks-http";

describe("Unit tests for delete book handler", function () {
  test("Delete handler", async () => {
    let testId = "tt0053604";
    const req = httpMocks.createRequest({
      params: {
        id: testId,
      },
    });
    const res = httpMocks.createResponse();

    await MovieController.show(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    let movie = resData.data;
    expect(movie.tconst).toBe(testId);
  });

  test("Delete handler - invalid request", async () => {
    const req = httpMocks.createRequest({ params: { id: "null" } });
    const res = httpMocks.createResponse();
    await MovieController.show(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
