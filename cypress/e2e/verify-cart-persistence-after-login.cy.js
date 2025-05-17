import LoginPage from "../pages/LoginPage";
import CheckoutPage from "../pages/CheckoutPage";

describe("Cart persistence after login", () => {
  it("should display previously added products in the cart after user login", () => {
    // Step 1: Visit the login page
    cy.visit(
      "https://magento.softwaretestingboard.com/customer/account/login/referer/"
    );
    // Step 2: Log in with an existing customer account
    LoginPage.login("testadmin@yahoo.com", "Admin123!");
    // Step 3: Verify that login was successful
    cy.url().should("include", "/customer/account");
    cy.wait(5000);// Temporary wait for slow loading (should be replaced with a proper wait)
    cy.get(".greet").should("contain", "Welcome, Admin Admin!");
    // Step 4: Navigate directly to the checkout page
    cy.visit("https://magento.softwaretestingboard.com/checkout/#shipping");
    // Temporary wait for slow loading (should be replaced with a proper wait)
    cy.wait(10000);
    // Step 5: Verify that the shipping form is prefilled with user data
    CheckoutPage.verifyShippingFormPrefilledWithAdmin();
    // Step 6: Verify that the order summary section is visible
    CheckoutPage.verifyOrderSummaryIsVisible();
    // Step 7: Verify that the cart displays the correct number of items
    CheckoutPage.verifyItemsInCartTitle();
  });
});
