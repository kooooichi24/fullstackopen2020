describe('Note app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('front page can be opende', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki 2020')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
    cy.get('#username').type('root')
    cy.get('#password').type('sekret')
    cy.get('#login-button').click()

    cy.contains('logged in')
  })
})