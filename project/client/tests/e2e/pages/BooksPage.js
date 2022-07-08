const { expect } = require("@playwright/test");
const { BasePage } = require("./BasePage");

class BooksPage extends BasePage {
  constructor(page) {
    super(page);
    this.bookPageComponent = page.locator("_react=BookPage");
    this.bookCard = page.locator("//div[@datatest-id='book']"); // xpath example
    this.bookTitleSelector = "h1";
  }

  /**
   * Returns number of books on a page
   */
  async getNumOfBooksOnPage() {
    await this.bookCard.first().waitFor();
    return this.bookCard.count();
  }

  /**
   * Gets a book locator based on the index provided
   * @param {number} index
   * @returns {locator}
   */
  async getBook(index) {
    if (index === -1) {
      return this.bookCard.last();
    }
    return this.bookCard.nth(index);
  }

  /**
   * Gets the total number of books from the pagination
   * @returns
   */
  getTotalNumOfBooks() {
    return this.getTotalPaginationNumber();
  }

  /**
   * Gets book title from the book with selected index
   * @param {number} index
   * @returns
   */
  async getBookTitle(index) {
    let bookLocator = await this.getBook(index);
    return bookLocator.locator(this.bookTitleSelector).innerText();
  }

  /**
   * Verifies that the number of books on the current page is equal to the expected value
   * @param {number} expectedValue
   */
  async verifyNumOfBooksOnPageEquals(expectedValue) {
    let currentNumOfBooks = await this.getNumOfBooksOnPage();
    expect(
      currentNumOfBooks,
      `Expected number of books on a page to equal ${expectedValue}`
    ).toEqual(expectedValue);
  }

  /**
   * Verifies that the number of books on the current page is less than initial number
   * @param {number} initialNum
   */
  async verifyNumOfBooksOnPageLessThen(initialNum) {
    let currentNumOfBooks = await this.getNumOfBooksOnPage();
    expect(
      currentNumOfBooks,
      `Expected number of books on a page to be less then ${initialNum}`
    ).toBeLessThan(initialNum);
  }

  /**
   * Verifies that the total number of books in the pagination is less than initial number
   * @param {number} initialNum
   */
  async verifyTotalNumOfBooksLessThen(initialNum) {
    await this.verifyTotalNumOfItemsLessThen(initialNum, "books");
  }

  /**
   * Verifies that the total number of books is equal to the expected value
   * @param {number} expectedValue
   */
  async verifyTotalNumOfBooksEqual(expectedValue) {
    return this.verifyTotalNumOfItemsEqual(expectedValue, "books");
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

  /**
   * Verifies the book title contains the expectedTitle text
   * @param {number} index - index of movie on the movie page
   * @param {string} expectedTitle - expected title value
   */
  async verifyBookTitle(index, expectedTitle) {
    let bookTitle = await this.getBookTitle(index);
    expect(
      bookTitle.toLowerCase().includes(expectedTitle.toLowerCase()),
      `Expected title ${expectedTitle.toLowerCase()} not included in result: ${bookTitle.toLowerCase()}`
    ).toBeTruthy();
  }
}

module.exports = { BooksPage };
