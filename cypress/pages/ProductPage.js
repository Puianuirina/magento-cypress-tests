class ProductPage {
  // ===== Selectors =====
  getFirstProductItem() {
    return cy.get(".product-item").first();
  }

  getSizeOption(size = "XS") {
    return cy.contains(size);
  }

  getFirstColorOption() {
    return cy.get(".swatch-option.color").first();
  }

  getAddToCartButton() {
    return cy.get('button[title="Add to Cart"]');
  }

  getSuccessMessage() {
    return cy.get(".page.messages");
  }

  getShoppingCart() {
    return cy.get('a[href*="/checkout/cart"]').contains("shopping cart");
  }

  getCartButton() {
    return cy.get(".action.showcart");
  }

  getCheckoutButton() {
    return cy.get("#top-cart-btn-checkout", { timeout: 10000 });
  }

  // ===== Actions =====
  selectFirstProduct() {
    this.getFirstProductItem().click();
  }

  selectSize(size) {
    this.getSizeOption(size).click();
  }

  selectColor() {
    this.getFirstColorOption().click();
  }

  clickAddToCart() {
    this.getAddToCartButton().click();
  }

  clickShoppingCart() {
    this.getShoppingCart().click();
  }

  verifyProductAdded(messagePart = "You added Breathe-Easy Tank to your") {
    this.getSuccessMessage()
      .should("contain.text", messagePart)
      .and("be.visible");
    this.getShoppingCart()
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "/checkout/cart");
  }

  hoverCartIcon() {
    this.getShoppingCart().trigger("mouseover");
  }

  openCart() {
    this.getCartButton().click();
  }

  clickProceedToCheckout() {
    this.getCheckoutButton().should("be.visible").click({ force: true });
  }

  waitForCheckoutPage() {
    cy.url().should("include", "/checkout/#shipping");
  }

  addFirstProductToCart(size = "XS") {
    this.selectFirstProduct();
    this.selectSize(size);
    this.selectColor();
    this.clickAddToCart();
    cy.wait(5000);
    this.verifyProductAdded();
    cy.wait(5000);
  }

proceedToCheckout() {
  cy.window().then((win) => {
    win.location.href = 'https://magento.softwaretestingboard.com/checkout/cart';
  });

  cy.get('h1.page-title', { timeout: 60000 }).should(($title) => {
    expect($title.text().toLowerCase()).to.include('shopping cart');
  });
}
}
export default new ProductPage();
