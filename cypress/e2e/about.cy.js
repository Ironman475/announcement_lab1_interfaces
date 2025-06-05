describe('About Page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('should display about information', () => {
    cy.contains('Канал оголошень').should('be.visible');
    cy.contains('Платформа для ефективного обміну інформацією').should('be.visible');
    cy.contains('Про додаток').should('be.visible');
    cy.contains('Можливості').should('be.visible');
    cy.contains('Технології').should('be.visible');
  });

  it('should display technology stack', () => {
    cy.contains('React').should('be.visible');
    cy.contains('Tailwind CSS').should('be.visible');
    cy.contains('Express').should('be.visible');
    cy.contains('Lucide Icons').should('be.visible');
  });

  it('should navigate to registration for unauthenticated user', () => {
    cy.contains('Почати користуватись').click();
    cy.url().should('include', '/register');
  });

  it('should navigate to announcements for authenticated user', () => {
    cy.login();
    cy.visit('/about');
    
    cy.contains('Перейти до оголошень').click();
    cy.url().should('include', '/announcements');
  });

  it('should be responsive', () => {
    cy.viewport(768, 1024);
    cy.contains('Канал оголошень').should('be.visible');
    
    cy.viewport(375, 667);
    cy.contains('Канал оголошень').should('be.visible');
  });
});