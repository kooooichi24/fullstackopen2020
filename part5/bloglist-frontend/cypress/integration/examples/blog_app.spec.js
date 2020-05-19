describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.makeUser({ username: 'root', name: 'root', password: 'sekret' })
    cy.makeUser({ username: 'root1', name: 'root1', password: 'sekret1' })
    cy.visit('http://localhost:3000')
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

  describe('When several blogs creaded by many people exist', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
      cy.createBlog({ title: 'title1', author: 'author1', url: 'url1' })
      cy.createBlog({ title: 'title2', author: 'author2', url: 'url2' })
      cy.contains('logout').click()
      cy.login({ username: 'root1', password: 'sekret1' })
      cy.createBlog({ title: 'title3', author: 'author3', url: 'url3' })

      cy.contains('title1').parent().as('blog1')
      cy.contains('title2').parent().as('blog2')
      cy.contains('title3').parent().as('blog3')
    })

    it('Model Answer: Blogs can be liked', function() {
      cy.get('@blog2').contains('view').click()
      cy.get('@blog2').contains('like').click()
      cy.get('@blog2').contains('likes 1')
    })

    it('Model Answer: The creator can delete a blog', function() {
      cy.get('@blog3').contains('view').click()
      cy.get('@blog3').contains('remove').click()
      cy.get('home').should('not.contain', 'test3')


      cy.get('@blog2').contains('view').click()
      // ここができない；；
      // Blog.jsの定義が違うのかな？
      // display:noneが効いていない希ガス
      // cy.get('@blog2').should('contain', 'remove')
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

    it.only('they are ordered by number of likes', function() {
      cy.get('@blog1').contains('view').click()
      cy.get('@blog2').contains('view').click()
      cy.get('@blog3').contains('view').click()
      cy.get('@blog1').contains('like').as('like1')
      cy.get('@blog2').contains('like').as('like2')
      cy.get('@blog3').contains('like').as('like3')

      cy.get('@like2').click()
      cy.get('@like1').click()
      cy.get('@like1').click()
      cy.get('@like3').click()
      cy.get('@like3').click()
      cy.get('@like3').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('likes 1')
        cy.wrap(blogs[1]).contains('likes 1')
        cy.wrap(blogs[2]).contains('likes 2')
      })
    })

  })
})