import MovieController from "../src/controllers/movies";
import httpMocks from "node-mocks-http";

describe("Unit tests for index handler", function () {
  test("Index handler - valid request", async () => {
    const req = httpMocks.createRequest({ method: "GET", url: "/movies" });
    const res = httpMocks.createResponse();

    await MovieController.index(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    let metaData = resData.meta;
    let realData = resData.data.movies;
    expect(typeof metaData.count).toBe("number");
    expect(metaData.itemsPerPage).toBe(8);
    expect(metaData.pageNum).toBe(0);
    expect(realData).toHaveLength(metaData.itemsPerPage);
    realData.forEach((element) => {
      expect(element).toHaveProperty("tconst");
      expect(element).toHaveProperty("primaryTitle");
    });
  });

  test("Index handler - invalid request", async () => {
    const req = httpMocks.createRequest({ query: { page: -199 } });
    const res = httpMocks.createResponse();
    await MovieController.index(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
