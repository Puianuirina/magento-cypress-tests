import "cypress-wait-until";
class ShoppingCartPage {
  // ===== Selectors =====
  getProceedToCheckoutButton() {
    return cy.get("button.action.primary.checkout", { timeout: 15000 });
  }

  getPageTitle() {
    return cy.get("h1.page-title");
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

    // Așteaptă apariția unui element de pe pagina de checkout, nu doar URL-ul
    cy.get('input[name="firstname"]', { timeout: 60000 }).should("be.visible");
  }

  // === Acțiune compusă (dacă vrei și verificare) ===
  proceedToCheckoutWithValidation() {
    this.verifyCartPageLoaded();
    this.clickProceedToCheckoutFromCart();
  }
}

export default new ShoppingCartPage();
