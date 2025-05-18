 Magento Cypress Tests
This repository contains end-to-end tests written in Cypress to validate core e-commerce flows on a Magento 2 storefront (e.g., shopping cart behavior, guest checkout, coupon handling).
### Getting Started Locally

Follow the steps below to run the project on your machine.

### 1. Clone the repository
git clone https://github.com/Puianuirina/magento-cypress-tests.git
cd magento-cypress-tests

### 2. Install dependencies
npm install

### 3. Install Cypress (if not already installed globally)
npm install cypress --save-dev

### 4. Open Cypress
npx cypress open - Open interactive mode
npx cypress run - Run all tests in headless mode

### Project Structure
magento-cypress-tests/
├── cypress/
│   ├── e2e/                # Test cases
│   │   ├── reload-recoverability-shopping-cart.cy.js
│   │   ├── guest-checkout-required-fields.cy.js
│   │   ├── invalid-coupon-code.cy.js
│   │   ├── verify-cart-persistence-after-login.cy.js
│   │   └── navigation-menu.cy.js
│   ├── pages/              # Page Object Model files
│   │   ├── ProductPage.js
│   │   ├── ShoppingCartPage.js
│   │   ├── CheckoutPage.js
│   │   ├── LoginPage.js
│   │   ├── OrderSuccessPage.js
│   │   └── PaymentPage.js
│   └── support/
│       ├── commands.js
│       └── e2e.js
├── cypress.config.js
├── package.json
└── package-lock.json

### Page Object Model (POM)
Each page (e.g., Product Page, Shopping Cart Page) has its own JS file under the pages/ directory. Test files import these page objects and call methods on them to interact with the UI in a clean and reusable way.

### Test Scenarios Implemented
1. Reload Recoverability – Shopping Cart
File: reload-recoverability-shopping-cart.cy.js

Ensures product details (size, color, price, qty) are preserved after page reload in the cart.

2. Guest Checkout – Required Fields Validation
File: guest-checkout-required-fields.cy.js

Validates that required fields during guest checkout are properly enforced.

3. Invalid Coupon Code
File: invalid-coupon-code.cy.js

Verifies that entering an invalid coupon shows the correct error.

4. Cart Persistence After Login
File: verify-cart-persistence-after-login.cy.js

Checks that the shopping cart is preserved when a guest user logs in.

5. Navigation Menu Functionality
File: navigation-menu.cy.js

Verifies that top menu links correctly lead to category pages.

