// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Existing movie search", () => {
  test("Search for existing movie - title check", async ({ page }) => {
    const searchInput = page.locator("#default-search");
    const movieLink = page.locator("a:has-text('Movies')");
    const movieCard = page.locator("[datatest-id='movie']");

    await movieLink.click();
    await page.waitForURL("http://localhost:3000/movies");
    await searchInput.click();
    await searchInput.fill("Harry Potter");
    await searchInput.press("Enter");
    let text = await movieCard.first().locator("h1");
    await expect(text).toContainText("Harry Potter");
    //await page.pause();
  });
});
