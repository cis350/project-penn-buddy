/* eslint-disable no-undef */
describe('Flow 1: Login with Nicky pennkey and password', () => {
  it('passes', () => {
    // open webpage
    cy.visit('http://localhost:3000');
    cy.get('#loginbutton').contains('Login');
    cy.get('#namefield').type('Nicky');
    cy.get('#namefield').should('have.value', 'Nicky');
    cy.get('#passwordfield').type('nicky');
    cy.get('#loginbutton').click();
    cy.get(/Activity Feed/);
  });
});

describe('Flow 2: After login, search activity feed for PHL Airport', () => {
  it('passes', () => {
    // open webpage
    cy.visit('http://localhost:3000');
    cy.get('#namefield').type('Nicky');
    cy.get('#passwordfield').type('nicky');
    cy.get('#loginbutton').click();
    cy.get('#activityfeedbutton').click();
    cy.get('#locationinput').type('EWR');
    cy.get('#locationinput').should('have.value', 'EWR');
    cy.get('#searchfilter').click();
    cy.contains(/spots remaining/).should('be.visible'); // Check if there exists post
  });
});

describe('Flow 3: View my profile after logging in', () => {
  it('passes', () => {
    // open webpage
    cy.visit('http://localhost:3000');
    cy.get('#namefield').type('Nicky');
    cy.get('#passwordfield').type('nicky');
    cy.get('#loginbutton').click();
    cy.get('#myprofilebutton').click();
    cy.contains(/CIS/).should('be.visible');
    cy.contains(/nicky/).should('be.visible');
  });
});
