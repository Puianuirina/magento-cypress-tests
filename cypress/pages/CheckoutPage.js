class CheckoutPage {
  // ===== Selectors =====
  getEmailInput() {
    return cy.get("#customer-email");
  }

  getFirstNameInput() {
    return cy.get('[name="firstname"]');
  }

  getLastNameInput() {
    return cy.get('[name="lastname"]');
  }

  getStreetInput() {
    return cy.get('[name="street[0]"]');
  }

  getCityInput() {
    return cy.get('[name="city"]');
  }

  getCountryDropdown() {
    return cy.get('select[name="country_id"]');
  }

  getRegionDropdown() {
    return cy.get('select[name="region_id"]');
  }

  getPostcodeInput() {
    return cy.get('[name="postcode"]');
  }

  getTelephoneInput() {
    return cy.get('[name="telephone"]');
  }

  getShippingMethodRadio() {
    return cy.get('input[name="ko_unique_1"]');
  }

  getNextButton() {
    return cy.contains("Next");
  }

  getPlaceOrderButton() {
    return cy.contains("Place Order", { timeout: 10000 });
  }

  getSuccessMessage() {
    return cy.contains("Thank you for your purchase");
  }

  getItemsInCartTitle() {
    return cy.get('div.title[data-role="title"]').contains("Items in Cart");
  }

  getProductQuantitiesFromSummary() {
    return cy
      .get(".minicart-items .product-item .product-item-details div")
      .then(($divs) => {
        return Cypress.$($divs).filter((index, el) =>
          el.innerText.includes("Qty:")
        );
      });
  }

  getOrderSummaryContainer() {
    return cy.get(".opc-block-summary", { timeout: 10000 });
  }

  getItemsInCartTitle() {
    return cy.get('div.title[data-role="title"]');
  }

  // ===== Actions =====
  generateGuestShippingData() {
    const randomString = Math.random().toString(36).substring(2, 8);

    return {
      email: `test_${randomString}@example.com`,
      firstName: `First${randomString}`,
      lastName: `Last${randomString}`,
      street: `Street ${Math.floor(Math.random() * 1000)}`,
      city: "Los Angeles",
      postcode: `${Math.floor(10000 + Math.random() * 89999)}`,
      telephone: `07${Math.floor(10000000 + Math.random() * 8999999)}`,
      country: "United States",
      region: "California",
    };
  }

  fillGuestInformation(data) {
    this.getEmailInput().should("be.visible").type(data.email);
    this.getFirstNameInput().type(data.firstName);
    this.getLastNameInput().type(data.lastName);
    this.getStreetInput().type(data.street);
    this.getCityInput().type(data.city);
    this.getCountryDropdown().select(data.country);
    this.getRegionDropdown().should("be.visible").select(data.region);
    this.getPostcodeInput().type(data.postcode);
    this.getTelephoneInput().type(data.telephone);
  }

  selectShippingMethod() {
    this.getShippingMethodRadio().check({ force: true });
  }

  proceedToPayment() {
    this.getNextButton().click();
  }

  placeOrder() {
    this.getPlaceOrderButton().click();
  }

  verifyOrderSuccess() {
    this.getSuccessMessage().should("exist");
  }
completeCheckout(data) {
  this.fillGuestInformation(data);
  this.selectShippingMethod();
  this.proceedToPayment();
}

  clickItemsInCartTitle() {
    this.getItemsInCartTitle()
      .should("be.visible")
      .and("have.css", "cursor", "pointer")
      .click();
  }
  verifyShippingFormPrefilledWithAdmin() {
    this.getFirstNameInput().should("have.value", "Admin");
    this.getLastNameInput().should("have.value", "Admin");
  }

  verifyCartSummaryQuantities(expectedQuantities = [6, 1]) {
    cy.get(".minicart-items .product-item .product-item-details *").then(
      ($elements) => {
        const qtyElements = [...$elements].filter((el) =>
          el.innerText.trim().startsWith("Qty:")
        );

        const actualQuantities = qtyElements.map((el) => {
          const match = el.innerText.match(/Qty:\s*(\d+)/);
          return match ? parseInt(match[1]) : 0;
        });

        expect(actualQuantities).to.deep.equal(expectedQuantities);
      }
    );
  }

  verifyOrderSummaryIsVisible() {
    this.getOrderSummaryContainer().should("be.visible");
  }

  verifyItemsInCartTitle(expectedText = "7 Items in Cart") {
    this.getItemsInCartTitle()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const cleaned = text.replace(/\s+/g, " ").trim();
        expect(cleaned).to.contain(expectedText);
      });
  }
}

export default new CheckoutPage();
