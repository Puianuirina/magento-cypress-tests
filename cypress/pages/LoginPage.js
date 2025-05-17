class LoginPage {
  // ===== Selectors =====
  getEmailInput() {
    return cy.get('#email');
  }

  getPasswordInput() {
    return cy.get('#pass');
  }

  getSignInButton() {
    return cy.get('#send2');
  }

  // ===== Actions =====
  enterEmail(email) {
    this.getEmailInput().clear().type(email);
  }

  enterPassword(password) {
    this.getPasswordInput().clear().type(password);
  }

  clickSignIn() {
    this.getSignInButton().click();
  }

  login(email, password) {
    this.enterEmail(email);
    this.enterPassword(password);
    this.clickSignIn();
  }
}

export default new LoginPage();
