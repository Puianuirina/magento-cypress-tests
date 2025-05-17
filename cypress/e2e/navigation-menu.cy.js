import HomePage from "../pages/HomePage";

describe('Main menu navigation', () => {
  beforeEach(() => {
    HomePage.visit();
  });

  it('should navigate to Women section', () => {
    HomePage.clickWomenCategory();
    cy.url().should('include', '/women.html');
    HomePage.verifyPageTitleContains('Women');
  });

  it('should navigate to Men section', () => {
    HomePage.clickMenCategory();
    cy.url().should('include', '/men.html');
    HomePage.verifyPageTitleContains('Men');
  });

  it('should navigate to Gear section', () => {
    HomePage.clickGearCategory();
    cy.url().should('include', '/gear.html');
    HomePage.verifyPageTitleContains('Gear');
  });

  it('should navigate to Training section', () => {
    HomePage.clickTrainingCategory();
    cy.url().should('include', '/training.html');
    HomePage.verifyPageTitleContains('Training');
  });

  it('should navigate to Sale section', () => {
    HomePage.clickSaleCategory();
    cy.url().should('include', '/sale.html');
    HomePage.verifyPageTitleContains('Sale');
  });
});
