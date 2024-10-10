describe('Sample Test', () => {
    it('Visits the home page', () => {
      cy.visit('/');
      cy.contains('Home');
    });
  });
  