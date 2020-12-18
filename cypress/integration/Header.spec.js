///<reference types="cypress" />

context('Header', () => {
  beforeEach(() => {
    cy.visit(SERVER_URL+'/login')
   
  })

  it('should have Budget in the h1', () => {
    cy.get('h1').contains('Budget')
  })

  it('should have the same look', () => {
    cy.eyesOpen({
      appName: 'Personal Budget Application',
      testName: 'Header label Check',
    });
    cy.eyesCheckWindow();
    cy.eyesClose();
  })
})
