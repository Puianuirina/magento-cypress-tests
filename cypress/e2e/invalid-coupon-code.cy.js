import ProductPage from "../pages/ProductPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";

describe("Coupon Code Application – Shopping Cart", () => {
  before(() => {
    // Step 1: Visit a product listing page (Women > Tops)
    cy.visit("https://magento.softwaretestingboard.com/women/tops-women.html");
    cy.get(".products-grid", { timeout: 10000 }).should("be.visible");
    // Step 2: Wait for product grid to load and add the first product to the cart
    ProductPage.addFirstProductToCart();
  });

  it("should display an error for an invalid coupon code", () => {
    // Step 3: Navigate to the Shopping Cart page
    cy.visit("https://magento.softwaretestingboard.com/checkout/cart/");
    ShoppingCartPage.verifyCartPageLoaded();
    // Step 4: Expand the discount section (if not already expanded)
    cy.wait(5000); //optional fallback wait – site performance is unstable
    ShoppingCartPage.expandDiscountSectionIfHidden();
    // Step 5: Type a randomly generated (invalid) coupon code
    ShoppingCartPage.typeRandomCouponCode();
    // Step 6: Click the "Apply Discount" button
    ShoppingCartPage.clickApplyCoupon();
    // Step 7: Verify that an error message appears for invalid coupon
    ShoppingCartPage.verifyDiscountNotApplied();
  });
});
