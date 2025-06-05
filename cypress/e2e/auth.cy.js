describe('Authentication Flow', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies(); 
        cy.visit('/api/logout'); 
    }); 

    describe('Login', () => {
        it('should login with valid credentials', () => {
            cy.login();
            cy.contains('Оголошення').should('be.visible');
        });

        it('should show error with invalid credentials', () => {
            cy.visit('/login');
            cy.get('input[type="email"]').type('wrong@example.com');
            cy.get('input[type="password"]').type('wrongpassword');
            cy.get('button[type="submit"]').click();

            cy.contains('Невірний email або пароль').should('be.visible');
        });

        it('should validate required fields', () => {
            cy.visit('/login');
            cy.get('button[type="submit"]').click();

            cy.get('input[type="email"]:invalid').should('exist');
            cy.get('input[type="password"]:invalid').should('exist');
        });
    });

    describe('Registration', () => {
        it('should register new user successfully', () => {
            const randomEmail = `test${Date.now()}@example.com`;

            cy.register({ email: randomEmail });
            cy.url().should('include', '/announcements');
        });

        it('should validate required fields', () => {
            cy.visit('/register');
            cy.get('button[type="submit"]').click();

            cy.contains('Введіть ім\'я').should('be.visible');
            cy.contains('Введіть email').should('be.visible');
            cy.contains('Введіть пароль').should('be.visible');
        });

        it('should prevent duplicate email registration', () => {
            cy.register({ email: 'admin@example.com' });
            cy.contains('Користувач з таким email вже існує').should('be.visible');
        });
    });

    describe('Logout', () => {
        it('should logout user successfully', () => {
            cy.login();
            cy.contains('Вихід').click();
            cy.url().should('eq', Cypress.config().baseUrl + '/login');
            cy.contains('Вхід').should('be.visible');
        });
    });
});