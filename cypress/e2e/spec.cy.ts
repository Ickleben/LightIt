let firstButton: any;

let firstCategory: any;
let secondCategory: any;

describe('LightIt', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/categories?apiKey=505snWzPU5VBAPtY2JMSI1HtMZYzGJS6',
    }).as('getCategories');

    cy.intercept({
      method: 'GET',
      url: 'https://api.giphy.com/v1/gifs/trending?limit=9&offset=0&apiKey=505snWzPU5VBAPtY2JMSI1HtMZYzGJS6',
    }).as('checkTrending');
  });

  it('Visits the initial project page', () => {
    cy.visit('/images');
  });

  it('Check if load trend ang categories', () => {
    cy.wait('@checkTrending').then((interception: any) => {
      assert.isNotNull(interception.response.body, 'getTrending is NOT NULL');
    });

    cy.wait('@getCategories').then((interception: any) => {
      firstCategory = interception.response.body.data[0];
      secondCategory = interception.response.body.data[1];
      assert.isNotNull(interception.response.body, 'asd is NOT NULL');
    });
  });

  it('choose tag', () => {
    cy.intercept({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/search?limit=9&offset=0&q=${firstCategory.name_encoded}&apiKey=505snWzPU5VBAPtY2JMSI1HtMZYzGJS6`,
    }).as('checkSearch');

    cy.get('app-categories div:first').click();

    cy.wait('@checkSearch').then((interception: any) => {
      assert.isNotNull(interception.response.body, 'Search is NOT NULL');
    });

    cy.get('app-categories div:first').should(($div) => {
      $div.hasClass('active');
    });
  });

  it('choose second tag', () => {
    cy.intercept({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/search?limit=9&offset=0&q=${firstCategory.name_encoded}%20${secondCategory.name_encoded}&apiKey=505snWzPU5VBAPtY2JMSI1HtMZYzGJS6`,
    }).as('checkMultiSearch');

    cy.get('app-categories div').eq(1).click();

    cy.get('app-categories div')
      .eq(1)
      .should(($div) => {
        $div.hasClass('active');
      });

    cy.wait('@checkMultiSearch').then((interception: any) => {
      assert.isNotNull(interception.response.body, 'MultiSearch is NOT NULL');
    });
  });

  it('Check scroll to bottom', () => {
    cy.intercept({
      method: 'GET',
      url: `https://api.giphy.com/v1/gifs/search?limit=9&offset=9&q=${firstCategory.name_encoded}%20${secondCategory.name_encoded}&apiKey=505snWzPU5VBAPtY2JMSI1HtMZYzGJS6`,
    }).as('checkScrollTo');

    cy.get('.scroll-container').scrollTo('bottom');

    cy.wait('@checkScrollTo').then((interception: any) => {
      assert.isNotNull(interception.response.body, 'CheckScrollTo is NOT NULL');
    });
  });
});
