const { expect } = require("@playwright/test");

class Footer {
  constructor(page) {
    this.page = page;
    this.footerLogo = page.locator('footer [data-testid="logo"]');
    this.copyrightText = page.locator("text=©");
    this.twitterIcon = page.locator("_react=TwitterIcon");
    this.instagramIcon = page.locator("_react=InstagramIcon");
  }

  /**
   * Verifies footer logo visible on the page
   */
  async verifyFooterLogo() {
    await expect(
      this.footerLogo,
      "Logo not visible in the footer"
    ).toBeVisible();
  }

  /**
   * Verifies that the copyright text contains the current year and company name
   */
  async verifyCopyrightText(year, company) {
    await expect(this.copyrightText).toContainText(year);
    await expect(this.copyrightText).toContainText(company);
  }

  /**
   * Clicking on social media link and verifying that they lead to correct url
   * @param {'twitter' | 'instagram'} icon
   */
  async verifySocialMediaLink(icon) {
    if (icon === "twitter") {
      await this.twitterIcon.click();
    } else if (icon === "instagram") {
      await this.instagramIcon.click();
    } else {
      throw Error("Invalid social media link");
    }

    await expect(
      this.page,
      `Social medial link ${icon} not navigating to matf site`
    ).toHaveURL("http://www.matf.bg.ac.rs/");
  }
}

module.exports = { Footer };
