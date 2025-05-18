import ProductPage from "../pages/ProductPage";
import ShoppingCartPage from "../pages/ShoppingCartPage";
describe("Page Reload Recoverability – Shopping Cart", () => {
  before(() => {
    // Step 1: Navigate to the women's tops category
    cy.visit("https://magento.softwaretestingboard.com/women/tops-women.html");
    cy.get(".products-grid", { timeout: 10000 }).should("be.visible");
    // Step 2: Add the first available product to the cart
    ProductPage.addFirstProductToCart();
  });

  it("should preserve product details in cart after reload", () => {
    // Step 3: Navigate to the shopping cart page
    cy.visit("https://magento.softwaretestingboard.com/checkout/cart/");
    ShoppingCartPage.verifyCartPageLoaded();
    // Step 4: Verify product attributes before reload
    ShoppingCartPage.verifyProductAttributes({
      size: "XS",
      color: "Purple",
      price: 34.0,
      qty: 1,
    });
    // Step 5: Reload the cart page
    cy.reload();
    // Step 6: Re-verify product attributes after reload
    ShoppingCartPage.verifyProductAttributes({
      size: "XS",
      color: "Purple",
      price: 34.0,
      qty: 1,
    });
  });
});
