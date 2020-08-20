// https://docs.cypress.io/api/introduction/api.html

describe('Home loads correctly', () => {
  it('Visits the app root url', () => {
    cy.visit('/');
    cy.contains('h1', 'Covid-19 Cases in the U.S.');
    cy.get('.container__chart').should('have.length', 2);
    cy.get('.container__totals').should('have.length', 2);
    cy.get('canvas').should('have.length', 2);

    // cy.get('.container__chart').each(() => {
    //   cy.get('canvas').matchImageSnapshot('#bar-chart');
    // });

    // cy.get('.container_page').matchImageSnapshot();
  });
});

// describe('Bar charts load correctly', () => {
//   it('Visits the app root url', () => {
//     cy.visit('/');
//     cy.contains('h1', 'Covid-19 Cases in the U.S.');
//   });
// });
