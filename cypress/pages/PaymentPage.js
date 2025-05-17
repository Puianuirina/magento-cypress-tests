class PaymentPage {
  // ===== Selectors =====

  getPaymentMethodOption(methodLabel = "Check / Money order") {
    return cy.get(".payment-method-title").contains(methodLabel);
  }

  getPlaceOrderButton() {
    return cy.get("button.checkout"); // class="action primary checkout"
  }

  getOrderSuccessMessage() {
    return cy.get(".checkout-success");
  }

  getOrderNumber() {
    return cy.get(".checkout-success .order-number");
  }

  getBillingShippingSameCheckbox() {
    return cy.get("#billing-address-same-as-shipping-checkmo");
  }

  getShipToSection() {
    return cy.get(".ship-to .shipping-information-content"); // alternativ: '.ship-to'
  }

  getShippingMethodSummary() {
    return cy.get(".shipping-method-content"); // sau caută "Flat Rate"
  }

  getOrderSummaryContainer() {
    return cy.get(".opc-block-summary");
  }

  // === Actions ===

  selectPaymentMethod(methodLabel = "Check / Money order") {
    this.getPaymentMethodOption(methodLabel).should("be.visible").click();
  }

  clickPlaceOrder() {
    this.getPlaceOrderButton()
      .should("be.visible")
      .and("not.be.disabled")
      .click();
  }

  verifyOrderSuccess() {
    this.getOrderSuccessMessage()
      .should("be.visible")
      .and("contain.text", "Thank you for your purchase!");
  }

  verifyOrderNumberIsVisible() {
    this.getOrderNumber().should("be.visible").and("not.be.empty");
  }

  verifyBillingShippingCheckboxIsChecked() {
    this.getBillingShippingSameCheckbox().should("exist").and("be.checked");
  }

  verifyShipToSectionVisible() {
    this.getShipToSection().should("exist").and("be.visible");
  }

  verifyShippingMethodSummaryVisible() {
    this.getShippingMethodSummary()
      .should("exist")
      .and("contain.text", "Flat Rate");
  }

  verifyOrderSummaryIsVisible() {
    this.getOrderSummaryContainer().should("exist").and("be.visible");
  }
}

export default new PaymentPage();
