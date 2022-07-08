// @ts-check
const { test } = require("@playwright/test");
const { Footer } = require("./pages/Footer");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Footer tests", () => {
  test("Footer logo visible on the page", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyFooterLogo();
  });

  test("Twitter icon navigates to expected site", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifySocialMediaLink("twitter");
  });

  test("Instagram icon navigates to expected site", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifySocialMediaLink("instagram");
  });

  test("Copyright text should be presented correctly", async ({ page }) => {
    const footer = new Footer(page);
    await footer.verifyCopyrightText("2022", "Matematički fakultet");
  });
});
