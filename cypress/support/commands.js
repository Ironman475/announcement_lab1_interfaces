// Команда для логіну
Cypress.Commands.add('login', (email = 'user@gmail.com', password = '1234') => {
  cy.visit('/login');
  cy.get('input[type="email"]').type(email);
  cy.get('input[type="password"]').type(password);
  cy.get('button[type="submit"]').click();
  cy.url().should('include', '/announcements');
});

// Команда для реєстрації
Cypress.Commands.add('register', (userData) => {
  const defaultUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123',
    gender: 'male',
    birthDate: '1990-01-01'
  };
  
  const user = { ...defaultUser, ...userData };
  
  cy.visit('/register');
  cy.get('input[name="name"]').type(user.name);
  cy.get('input[name="email"]').type(user.email);
  cy.get('input[name="password"]').type(user.password);
  cy.get('select[name="gender"]').select(user.gender);
  cy.get('input[name="birthDate"]').type(user.birthDate);
  cy.get('button[type="submit"]').click();
});

// Команда для очищення localStorage
Cypress.Commands.overwrite('clearLocalStorage', (originalFn, ...args) => {
  cy.log('Custom clearLocalStorage called');
  return cy.window().then((win) => {
    win.localStorage.clear();
  });
});

