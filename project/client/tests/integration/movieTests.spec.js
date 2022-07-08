const { test, expect } = require("@playwright/test");

test.describe("Movies api integration tests", () => {
  const baseUrl = "http://localhost:4000";
  const defaultItemsPerPage = 8;
  const defaultPage = 0;

  test("Get movies test - no parameters", async ({ request }) => {
    const response = await request.get(`${baseUrl}/api/v1/movies`);
    expect(response.status()).toBe(200);

    const responseBody = JSON.parse(await response.text());
    expect(responseBody.meta).toBeTruthy();
    expect(typeof responseBody.data).toBe("object");

    let metaValues = responseBody.meta;
    expect(typeof metaValues.count).toBe("number");
    expect(metaValues.count).toBeGreaterThan(0);
    expect(metaValues.pageNum).toBe(defaultPage);
    expect(metaValues.itemsPerPage).toBe(defaultItemsPerPage);

    let movies = responseBody.data.movies;
    expect(movies.length).toBe(defaultItemsPerPage);
  });

  // TODO: helpers
  // TODO: Kombinovano - npr svi movies pa search za jednog

  // TODO: KOmbinovano - npr svi movies pa onda rating da se poklapa sa ovim
});
