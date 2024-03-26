/// <reference types="cypress" />

import LogInCard from './LogInCard';

describe('LogInCard Component', () => {
  beforeEach(() => {
    cy.mount(<LogInCard />);
  });

  it('renders login form with inputs and button', () => {
    cy.get('h1').should('have.text', 'Login');

    cy.get('input[type="text"]').should('have.attr', 'placeholder', 'Username');
    cy.get('input[type="password"]').should(
      'have.attr',
      'placeholder',
      'Password'
    );

    cy.get('button').should('have.text', 'Sign In');
  });

  it('allows user to input username and password', () => {
    const username = 'testuser';
    const password = 'testpassword';

    cy.get('input[type="text"]').type(username).should('have.value', username);
    cy.get('input[type="password"]')
      .type(password)
      .should('have.value', password);
  });

  it('displays the logo', () => {
    cy.get('img[alt="Logo"]').should('be.visible');
  });

  // it('redirects to a different page after successful login', () => {
  //   const username = 'testuser';
  //   const password = 'testpassword';

  //   cy.get('input[type="text"]').type(username);
  //   cy.get('input[type="password"]').type(password);
  //   cy.get('button').click();

  //   cy.url().should('include', '/dashboard');
  //   // Assuming successful login redirects to a dashboard page
  // });
});
