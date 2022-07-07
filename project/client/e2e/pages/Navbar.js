const { expect } = require("@playwright/test");

class Navbar {
  constructor(page) {
    this.page = page;
    this.headerLogo = page.locator('header [data-testid="logo"]');
    this.homeLink = page.locator('header a:has-text("Home")');
    this.moviesLink = page.locator('header a:has-text("Movies")');
    this.booksLink = page.locator('header a:has-text("Books")');
  }

  async verifyHeaderLogo() {
    await expect(
      this.headerLogo,
      "Logo not visible on the header page"
    ).toBeVisible();
  }

  /**
   * Clicking on logo
   */
  async clickOnLogo() {
    await this.headerLogo.click();
  }

  /**
   * Navigate to tab
   * @param {*} tabName
   */
  async navigateToTab(tabName) {
    switch (tabName) {
      case "home":
        await this.homeLink.click();
        await this.page.waitForURL("/");
        break;
      case "movies":
        await this.moviesLink.click();
        await this.page.waitForURL("/movies");
        break;
      case "books":
        await this.booksLink.click();
        await this.page.waitForURL("/books");
        break;
      default:
        throw Error("Invalid tab selected");
    }
  }

  async verifyUrl() {
    await expect(this.page).toHaveURL(/.*movies/);
  }
}

module.exports = { Navbar };
