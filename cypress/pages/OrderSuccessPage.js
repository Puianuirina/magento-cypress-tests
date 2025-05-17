class OrderSuccessPage {
  // ===== Selectors =====

  getSuccessMessage() {
    return cy.get(".checkout-success p:first-of-type"); // sau alt selector potrivit
  }

  getContinueShoppingButton() {
    return cy.get(".checkout-success a.action.primary.continue");
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
      .and("have.attr", "href")
      .click();
    cy.url().should("eq", "https://magento.softwaretestingboard.com/");
  }
}

export default new OrderSuccessPage();
