class HomePage {
  // ===== Selectors =====
  getWomenMenu() {
    return cy.contains('Women');
  }

  getTopsMenu() {
    return cy.get('a[href*="women/tops-women"]').contains('Tops');
  }
  getMenMenu() {
    return cy.contains('nav a', 'Men');
  }

  getGearMenu() {
    return cy.contains('nav a', 'Gear');
  }

  getTrainingMenu() {
    return cy.contains('nav a', 'Training');
  }

  getSaleMenu() {
    return cy.contains('nav a', 'Sale');
  }

  // ===== Actions =====
  visit() {
    cy.visit('https://magento.softwaretestingboard.com/');
  }

  clickWomenCategory() {
    this.getWomenMenu().click();
  }

  clickTopsSubcategory() {
    this.getTopsMenu().click({ force: true });
  }
  clickMenCategory() {
    this.getMenMenu().click();
  }

  clickGearCategory() {
    this.getGearMenu().click();
  }

  clickTrainingCategory() {
    this.getTrainingMenu().click();
  }

  clickSaleCategory() {
    this.getSaleMenu().click();
  }

  verifyPageTitleContains(text) {
    cy.get('h1.page-title').should('contain.text', text);
  }

  // === Acțiune compusă ===
  navigateToWomenTops() {
    this.visit();
    this.clickWomenCategory();
    this.clickTopsSubcategory();
  }
}

export default new HomePage();
