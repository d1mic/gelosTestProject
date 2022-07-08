const { expect } = require("@playwright/test");

const ITEMS_PER_PAGE = 8;

class BasePage {
  constructor(page) {
    this.page = page;
    this.searchField = page.locator("#default-search");
    this.notFoundImg = page.locator('img[alt="NOT FOUND"]');
    this.pageStartNum = page.locator('[data-testid="startNum"]');
    this.pageEndNum = page.locator('[data-testid="endingNum"]');
    this.paginationText = page.locator("#pagination");
    this.loader = page.locator('[datatest-id="loader"]');
    this.totalNumOfResults = this.paginationText.locator(
      "[data-testid='numofResults']"
    );
    this.nextPage = this.paginationText.locator("text=next");
    this.previousPage = this.paginationText.locator("text=prev");
  }

  /**
   * Searches for the query and presses enter
   * @param {string} query
   */
  async search(query) {
    await this.searchField.fill(query);
    await this.searchField.press("Enter");
    await this.searchField.waitFor();
  }

  /**
   * Verifies that the not found image is visible on the page
   */
  async verifyNotFoundImage() {
    await expect(this.notFoundImg).toBeVisible();
  }

  /**
   * Verifies that no results text is presented in the pagination section
   */
  async verifyNoResultsText() {
    await expect(this.paginationText).toContainText("No results");
  }

  /**
   * Gets the total number of items from the pagination
   */
  async getTotalPaginationNumber() {
    await this.totalNumOfResults.waitFor();
    return parseInt(await this.totalNumOfResults.innerText());
  }

  /**
   * Verifies pagination starting number
   * @param {*} expectedStartNum
   */
  async verifyPageStartNum(expectedStartNum) {
    let pageStartNum = parseInt(await this.pageStartNum.innerText());
    expect(pageStartNum).toEqual(expectedStartNum);
  }

  /**
   * Verifies pagination starting number
   * @param {*} expectedEndNum
   */
  async verifyPageEndNum(expectedEndNum) {
    let pageStartNum = parseInt(await this.pageEndNum.innerText());
    expect(pageStartNum).toEqual(expectedEndNum);
  }

  /**
   * Verifies that the total num in the pagination is less then initialNum
   * @param {number} initialNum - initial number
   * @param {string} itemName - name of items that are counted
   */
  async verifyTotalNumOfItemsLessThen(initialNum, itemName = "movies") {
    let totalNumOfResults = await this.getTotalPaginationNumber();
    expect(
      totalNumOfResults,
      `Expected total number of ${itemName} to be less then ${initialNum}`
    ).toBeLessThan(initialNum);
  }

  /**
   * Verifies that the total number of items is equal to the expected value
   * @param {number} expectedValue
   * @param {string} itemName - name of items that are counted
   */
  async verifyTotalNumOfItemsEqual(expectedValue, itemName) {
    let totalNumOfResults = await this.getTotalPaginationNumber();
    expect(
      totalNumOfResults,
      `Expected total number of ${itemName} to equal ${expectedValue}`
    ).toEqual(expectedValue);
  }

  async clickNext() {
    await this.nextPage.click();
  }

  async clickPrevious() {
    await this.previousPage.click();
  }

  async navigateToLastPage() {
    let totalNumOfItems = await this.getTotalPaginationNumber();
    let numOfPages = Math.ceil(totalNumOfItems / ITEMS_PER_PAGE);
    for (let i = 1; i < numOfPages; i++) {
      await this.nextPage.click();
    }
  }
}

module.exports = { BasePage };
