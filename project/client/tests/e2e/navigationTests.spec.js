// @ts-check
const { test } = require("@playwright/test");
const { BooksPage } = require("./pages/BooksPage");
const { HomePage } = require("./pages/HomePage");
const { MoviesPage } = require("./pages/MoviesPage");
const { Navbar } = require("./pages/Navbar");

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe("Navigation bar tests", () => {
  test("Header logo visible on the page", async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.verifyHeaderLogo();
  });

  test("Movies link navigates to movies page", async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.navigateToTab("movies");
    let moviePage = new MoviesPage(page);
    await moviePage.verifyURL();
    await moviePage.verifyMoviePage();
  });

  test("Books link navigates to books page", async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.navigateToTab("books");
    let booksPage = new BooksPage(page);
    await booksPage.verifyURL();
    await booksPage.verifyBooksPage();
  });

  test("Home link navigates to homepage", async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.navigateToTab("books");
    await navbar.navigateToTab("home");
    let homePage = new HomePage(page);
    await homePage.verifyURL();
    await homePage.verifyHomepage();
  });

  test("Logo navigates to homepage", async ({ page }) => {
    const navbar = new Navbar(page);
    await navbar.navigateToTab("movies");
    await navbar.clickOnLogo();
    let homePage = new HomePage(page);
    await homePage.verifyURL();
    await homePage.verifyHomepage();
  });
});
