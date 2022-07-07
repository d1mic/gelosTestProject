const { expect } = require("@playwright/test");

class BooksPage {
  constructor(page) {
    this.page = page;
    this.bookPageComponent = page.locator("_react=BookPage");
    this.bookSearchField = page.locator("#default-search");
  }

  /**
   * Verifies that the url contains /books
   */
  async verifyURL() {
    await expect(
      this.page,
      "Invalid url shown when trying to navigate to books page"
    ).toHaveURL(/.*books/);
  }

  /**
   * Verifies that the books page is presented
   */
  async verifyBooksPage() {
    await expect(
      this.bookPageComponent,
      "Book page component not showing up correctly"
    ).toBeVisible();
  }
}

module.exports = { BooksPage };
