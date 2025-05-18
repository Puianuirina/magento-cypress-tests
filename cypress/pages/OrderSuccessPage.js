class OrderSuccessPage {
  // ===== Selectors =====

  getSuccessMessage() {
    return cy.get('span[data-ui-id="page-title-wrapper"]', { timeout: 10000 });
  }

  getContinueShoppingButton() {
    return cy.get(".checkout-success a.action.primary.continue");
  }

  getCreateAccountLink() {
    return cy.contains("a.action.primary", "Create an Account", {
      timeout: 10000,
    });
  }

  // ===== Actions =====

  verifySuccessMessageVisible(expectedText = "Thank you for your purchase!") {
    this.getSuccessMessage()
      .should("be.visible")
      .and("contain.text", expectedText);
  }

  clickContinueShopping() {
    this.getContinueShoppingButton()
      .should("be.visible")
      .and("have.attr", "href", "https://magento.softwaretestingboard.com/");

    this.getContinueShoppingButton().click();
    cy.url({ timeout: 10000 }).should(
      "eq",
      "https://magento.softwaretestingboard.com/"
    );
  }

  verifyCreateAccountLinkVisible() {
    this.getCreateAccountLink()
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/checkout/account/delegateCreate/");
  }
}

export default new OrderSuccessPage();
