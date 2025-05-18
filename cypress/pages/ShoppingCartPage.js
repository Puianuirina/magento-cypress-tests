import "cypress-wait-until";
class ShoppingCartPage {
  // ===== Selectors =====
  getProceedToCheckoutButton() {
    return cy.get("button.action.primary.checkout", { timeout: 15000 });
  }

  getPageTitle() {
    return cy.get("h1.page-title");
  }

  getProductOptions() {
    return cy.get(".item-options");
  }

  getProductPrice() {
    return cy.get(".col.price");
  }

  getProductQuantityInput() {
    return cy.get(".input-text.qty");
  }

  getPageTitle() {
    return cy.get("h1.page-title");
  }

  getDiscountToggle() {
    return cy.contains("div.cart-discount div.title", "Apply Discount Code");
  }

  getCouponInput() {
    return cy.get("#coupon_code", { timeout: 10000 });
  }

  getApplyCouponButton() {
    return cy.get("button.action.apply.primary");
  }

  getInvalidCouponMessage() {
    return cy.get("div.message-error");
  }

  // ===== Actions =====
  verifyCartPageLoaded() {
    this.getPageTitle().should("contain.text", "Shopping Cart");
  }

  clickProceedToCheckoutFromCart() {
    cy.get("button.action.primary.checkout", { timeout: 30000 })
      .should("exist")
      .and("be.visible")
      .and("not.be.disabled")
      .and(($btn) => {
        expect($btn).to.not.have.css("pointer-events", "none");
      })
      .click({ force: true });

    cy.get('input[name="firstname"]', { timeout: 60000 }).should("be.visible");
  }

  proceedToCheckoutWithValidation() {
    this.verifyCartPageLoaded();
    this.clickProceedToCheckoutFromCart();
  }

  verifyProductAttributes({ size, color, price, qty }) {
    this.getProductOptions()
      .should("contain.text", `Size`)
      .and("contain.text", size)
      .and("contain.text", `Color`)
      .and("contain.text", color);

    this.getProductPrice().should("contain.text", `$${price.toFixed(2)}`);
    this.getProductQuantityInput().should("have.value", `${qty}`);
  }
  expandDiscountSection() {
    this.getDiscountToggle().should("be.visible").click();
  }
  expandDiscountSectionIfHidden() {
    this.getDiscountToggle()
      .should("be.visible")
      .then(($toggle) => {
        if ($toggle.attr("aria-expanded") === "false") {
          cy.wrap($toggle)
            .click()
            .then(() => {
              this.getCouponInput().should("be.visible");
            });
        } else {
          this.getCouponInput().should("be.visible");
        }
      });
  }

  typeRandomCouponCode() {
    const randomCode = `TEST-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;
    this.expandDiscountSectionIfHidden();
    this.getCouponInput()
      .should("be.visible")
      .clear({ force: true })
      .type(randomCode);
  }

  clickApplyCoupon() {
    this.getApplyCouponButton().should("be.visible").click();
  }

  verifyDiscountNotApplied() {
    this.getInvalidCouponMessage()
      .should("be.visible")
      .and("contain.text", "The coupon code");
  }
}

export default new ShoppingCartPage();
