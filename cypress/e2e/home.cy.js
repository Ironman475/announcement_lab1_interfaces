describe('Home Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('should display welcome content', () => {
    cy.contains('Канал оголошень').should('be.visible');
    cy.contains('Ваша платформа для створення та перегляду оголошень').should('be.visible');
  });

  it('should navigate to registration page', () => {
    cy.contains('Реєстрація').click();
    cy.url().should('include', '/register');
  });

  it('should navigate to login page', () => {
    cy.contains('Вхід').click();
    cy.url().should('include', '/login');
  });

  it('should navigate to about page', () => {
    cy.contains('Дізнатись більше про додаток').click();
    cy.url().should('include', '/about');
  });

  it('should be responsive', () => {
    cy.viewport(768, 1024);
    cy.contains('Канал оголошень').should('be.visible');
    
    cy.viewport(375, 667);
    cy.contains('Канал оголошень').should('be.visible');
  });
});