describe('Profile Page', () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit('/api/logout'); 
    cy.login();
    cy.visit('/profile');
  });

  it('should display user profile information', () => {
    cy.contains('Профіль користувача').should('be.visible');
    cy.contains('user@gmail.com').should('be.visible');
    cy.contains('Адміністратор').should('be.visible');
  });

  it('should allow editing profile', () => {
    cy.contains('Редагувати').click();
    
    cy.get('input[name="name"]').clear().type('Updated Name');
    cy.contains('Зберегти').click();
    
    cy.contains('Профіль оновлено').should('be.visible');
    cy.reload();
    cy.contains('Updated Name').should('be.visible');
  });

  it('should cancel profile editing', () => {
    cy.contains('Редагувати').click();
    cy.get('input[name="name"]').clear().type('Changed Name');
    cy.contains('Скасувати').click();
    
    cy.get('input[name="name"]').should('not.exist');
  });


});