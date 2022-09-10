// @ts-check
const { test } = require("@playwright/test");
const { BooksPage } = require("./pages/BooksPage");

test.beforeEach(async ({ page }) => {
  await page.goto("/books");
});

test.describe("Search books tests", () => {
  test("No results search query", async ({ page }) => {
    const booksPage = new BooksPage(page);
    await booksPage.search("some invalid text thats not a book");
    await booksPage.verifyNotFoundImage();
  });

  test("Valid search query - full page result", async ({ page }) => {
    const booksPage = new BooksPage(page);
    let numOfBooks = await booksPage.getNumOfBooksOnPage();
    let totalNumOfResults = await booksPage.getTotalNumOfBooks();
    await booksPage.search("Harry");
    await booksPage.verifyNumOfBooksOnPageEquals(numOfBooks);
    await booksPage.verifyTotalNumOfBooksLessThen(totalNumOfResults);
  });

  test("Valid search query - partial page result", async ({ page }) => {
    const booksPage = new BooksPage(page);
    let numOfBooks = await booksPage.getNumOfBooksOnPage();
    await booksPage.search("eBay for Dummies");
    await booksPage.verifyNumOfBooksOnPageLessThen(numOfBooks);
    let numOfBooksOnPage = await booksPage.getNumOfBooksOnPage();
    await booksPage.verifyTotalNumOfBooksEqual(numOfBooksOnPage);
  });

  test("Empty search query", async ({ page }) => {
    const booksPage = new BooksPage(page);
    let initialNumOfBooks = await booksPage.getTotalNumOfBooks();
    await booksPage.search("Something");
    await booksPage.verifyTotalNumOfBooksLessThen(initialNumOfBooks);
    await booksPage.search("");
    await booksPage.verifyTotalNumOfBooksEqual(initialNumOfBooks);
  });

  test("Valid search query - search returns proper data", async ({ page }) => {
    const booksPage = new BooksPage(page);
    const searchQuery = "Dorian Gray";
    await booksPage.search(searchQuery);
    let numOfBooks = await booksPage.getNumOfBooksOnPage();
    for (let i = 0; i < numOfBooks; i++) {
      await booksPage.verifyBookTitle(i, searchQuery);
    }
  });
});
