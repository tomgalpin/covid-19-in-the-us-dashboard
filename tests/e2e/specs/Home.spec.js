// https://docs.cypress.io/api/introduction/api.html

import { STATE_CODES } from '../../../src/constants/stateCodes.js';

describe('Home', () => {
  it('visits "/" & loads content correctly', () => {
    cy.visit('/');

    cy.contains('h1', 'Covid-19 Cases in the U.S.');
    cy.get('.container__chart').should('have.length', 2);
    cy.get('.container__totals').should('have.length', 2);
    cy.get('canvas').should('have.length', 2);

    // cy.get('.container__chart').each(() => {
    //   cy.get('canvas').matchImageSnapshot('#bar-chart');
    // });

    // cy.get('.container__page').matchImageSnapshot();
  });

  // nav header
  // side nav
  it('loads the left nav correctly', () => {
    cy.visit('/');

    cy.get('.side-nav ul')
      .find('li')
      .not('.menu-item')
      .should('have.length', 3);

    cy.get('.side-nav ul')
      .find('li')
      .not('.menu-item')
      .eq(1)
      .click();

    // cy.log(second);

    // cy.get('.side-nav ul')
    //   .find('li.menu-item')
    //   .should('have.length', 56);
    // const tomtom = STATE_CODES;
    // cy.log(tomtom);

    // cy.get('.side-nav ul')
    //   .find('li.menu-item')
    //   .each(($el, index) => {
    // cy.log(cy.get($el).find('span'));
    // const test = cy.get($el).children();
    // cy.log(test);
    // cy.get($el)
    //   .find('span')
    //   .contains(STATE_CODES[index].text);
    // cy.log(2, index);
    // });

    // cy.get('').contains(stateCodes[index]);
    // console.log(1, el);
    // console.log(2, index);
    // cy.get(el).find('span').contains()
    // cy.log(el);
    // cy.log(index);
    // });
  });
});

// describe('Bar charts load correctly', () => {
//   it('Visits the app root url', () => {
//     cy.visit('/');
//     cy.contains('h1', 'Covid-19 Cases in the U.S.');
//   });
// });
