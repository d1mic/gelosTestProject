const { expect } = require("@playwright/test");

class HomePage {
  constructor(page) {
    this.page = page;
    this.homepageComponent = page.locator("_react=HomePage");
  }

  /**
   * Verifies that the url on the homepage
   */
  async verifyURL() {
    await expect(this.page, "Invalid url on homepage").toHaveURL("/");
  }
  /**
   * Verifies that the home page is presented correctly
   */
  async verifyHomepage() {
    await expect(
      this.homepageComponent,
      'Homepage not showing up correctly"'
    ).toBeVisible();
  }
}

module.exports = { HomePage };
