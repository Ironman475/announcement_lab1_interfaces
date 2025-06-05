describe('Announcements Page', () => {
    beforeEach(() => {
        cy.clearLocalStorage();
        cy.login();
    });

    it('should display announcements list', () => {
        cy.contains('Оголошення').should('be.visible');
        cy.get('[data-testid="announcement-card"]').should('have.length.at.least', 1);
    });

    it('should filter announcements by search', () => {
        cy.get('input[placeholder="Пошук оголошень..."]').type('123');
        cy.get('[data-testid="announcement-card"]').should('be.visible');
    });

    it('should allow admin to create announcement', () => {
        // Спочатку логінимося як адмін
        cy.clearLocalStorage();
        cy.login('user@gmail.com', '1234');

        cy.contains('Додати').click();

        cy.get('input[name="title"]').type('Test Announcement');
        cy.get('select[name="category"]').select('Розваги');
        cy.get('textarea[name="content"]').type('This is test announcement content');

        cy.contains('Створити').click();

        cy.contains('Test Announcement').should('be.visible');
    });

    it('should allow user to react to announcements', () => {
        cy.get('[data-testid="like-button"]').first().click();
        cy.get('[data-testid="like-count"]').first().should('contain', '1');
    });
});