import ProductPage from "../pages/ProductPage";
import CheckoutPage from "../pages/CheckoutPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
import HomePage from "../pages/HomePage";
import PaymentPage from "../pages/PaymentPage";
import OrderSuccessPage from "../pages/OrderSuccessPage";

describe("Guest order placement", () => {
  it("should allow a guest user to place an order successfully", () => {
    // Step 1: Navigate to Women > Tops category
    HomePage.navigateToWomenTops();
    // Step 2: Add the first product to the cart
    ProductPage.addFirstProductToCart();
    // Step 3: Navigate directly to the checkout page
    cy.visit("https://magento.softwaretestingboard.com/checkout/#shipping");
  

    //****** Alternative steps to reach the shipping page ********//
    //****** To make the test more reliable, I chose not to use these steps due to the site's poor performance ******//
      // Step x: Proceed to checkout directly from product
    // ProductPage.proceedToCheckout();
    // ShoppingCartPage.proceedToCheckoutWithValidation();

    cy.wait(10000);// Temporary wait for slow loading (should be replaced with a proper wait)
    // Step 4: Complete shipping form and continue as guest
    const guestData = CheckoutPage.generateGuestShippingData();
    CheckoutPage.completeCheckout(guestData);
    // Step 5: Verify the billing/shipping address checkbox is selected
    PaymentPage.verifyBillingShippingCheckboxIsChecked();
    // Step 6: Verify that the "Ship to" section is visible
    PaymentPage.verifyShipToSectionVisible();
    // Step 7: Verify that the selected shipping method is shown
    PaymentPage.verifyShippingMethodSummaryVisible();
    // Step 8: Verify the Order Summary section is visible
    PaymentPage.verifyOrderSummaryIsVisible();
    // Step 9: Place the order
    PaymentPage.clickPlaceOrder();
    // Step 10: Verify that the success message is displayed
    OrderSuccessPage.verifySuccessMessageVisible();
    // Step 11: Click "Continue Shopping" to return to the store
    OrderSuccessPage.clickContinueShopping();
  });
});
