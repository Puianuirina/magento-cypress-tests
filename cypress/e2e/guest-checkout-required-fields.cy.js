import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";

describe("Negative test – Shipping form validation (after cart setup)", () => {
  before(() => {
    // Step 1: Navigate to product listing and add a product to the cart
    cy.visit("https://magento.softwaretestingboard.com/women/tops-women.html");
    cy.get('.products-grid', { timeout: 10000 }).should('be.visible');
    ProductPage.addFirstProductToCart();
  });

  it("should show validation errors when required fields are empty", () => {
    // Step 2: Go to the shipping page
    cy.visit("https://magento.softwaretestingboard.com/checkout/#shipping");
    cy.get("form#co-shipping-form").should("exist");

    // Step 3: Wait for shipping methods to be loaded
    CheckoutPage.selectShippingMethod();

    // Step 4: Attempt to continue without filling required fields
    cy.get("button.continue", { timeout: 15000 }).should("be.visible").click();

    // Step 5: Assert that all required fields are marked as invalid
    CheckoutPage.verifyAllRequiredFieldsMarkedInvalid();
  });
});

