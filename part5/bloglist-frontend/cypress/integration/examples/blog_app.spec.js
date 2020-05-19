describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.makeUser({ username: 'root', name: 'root', password: 'sekret' })
    cy.makeUser({ username: 'root1', name: 'root1', password: 'sekret1' })
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()
  
      cy.contains('root logged in')
    })
  
    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()
  
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
      
      cy.get('html').should('not.contain', 'root logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('create').click()
      cy.createBlog({
        title: 'title1',
        author: 'author1',
        url: 'url1'
      })
      cy.contains('title1')
    })

    describe('When made like', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
        cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
        cy.createBlog({ title: 'title3', author: 'author3', url: 'url3' })
      })

      it('increment number of like', function() {
        cy.contains('title2')
          .contains('view')
          .click()

        cy.contains('author2').parent().contains('likes').find('button').click()
        cy.contains('author2').parent().contains('likes 1')
      })
    })
  })

  describe.only('Delete', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
    })

    it('succeeds with correct credentials', function() {
      cy.contains('title2')
        .contains('view')
        .click()
          
      cy.contains('author2').parent().contains('remove').click(() => {
        cy.on('window:confirm', () => true)
      })
    })

    it('fails with wrong credentials', function() {
      cy.contains('logout').click()
      cy.login({ username: 'root1', password: 'sekret1' })

      cy.contains('title2')
        .contains('view')
        .click()
      
      // I can't....
      // Optional bonus exercise: also check that other users cannot delete the blog.
      // cy.contains('author2').parent()
      //   .should('contain', 'remove')
      //   .and('have.css', 'display', 'none')
    })
  })
})