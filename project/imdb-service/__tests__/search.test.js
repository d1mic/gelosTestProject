import MovieController from "../src/controllers/movies";
import httpMocks from "node-mocks-http";

describe("Unit tests for search handler", function () {
  test("Search handler - valid request", async () => {
    let testQuery = "Inception";
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/search",
      query: {
        query: testQuery,
      },
    });
    const res = httpMocks.createResponse();

    await MovieController.search(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    let metadata = resData.meta;
    let searchData = resData.data.movies;

    expect(typeof metadata.count).toBe("number");
    expect(searchData.length).toBeGreaterThan(0);
    searchData.forEach((element) => {
      expect(element).toHaveProperty("primaryTitle");
      expect(element.primaryTitle.includes(testQuery)).toBe(true);
    });
  });

  test("Seach handler - no response to /search ", async () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/search",
      query: { query: 5 },
    });
    const res = httpMocks.createResponse();

    await MovieController.search(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
