import MovieController from "../src/controllers/movies";
import httpMocks from "node-mocks-http";

describe("Unit tests for edit rating handler", function () {
  test("Edit handler", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      params: {
        id: "tt0053559",
      },
      body: {
        rating: 4.6,
      },
    });
    const res = httpMocks.createResponse();

    await MovieController.editRating(req, res);

    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(200);

    let resData = res._getJSONData();
    console.log(resData);
    expect(resData.data.averageRating).toBe(4.6);
    expect(resData.data.numVotes).toBe(1);
  });

  test("Edit handler - invalid request", async () => {
    const req = httpMocks.createRequest({
      method: "PUT",
      body: {
        rating: 4.6,
      },
    });
    const res = httpMocks.createResponse();
    await MovieController.editRating(req, res);
    let resStatus = res._getStatusCode();
    expect(resStatus).toBe(500);
  });
});
