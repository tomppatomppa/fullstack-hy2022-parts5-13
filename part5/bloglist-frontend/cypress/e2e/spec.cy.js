describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'tomi west',
      username: 'tomi',
      password: '1234',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function () {
    cy.contains('login to application').click()
    cy.contains('Blogs')
    cy.contains('login')
    cy.contains('login').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('tomi')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()

      cy.contains('tomi west logged-in')
    })

    it('fail with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('tomi')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('#notification').contains('red')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.contains('login').click()
      cy.get('#username').type('tomi')
      cy.get('#password').type('1234')
      cy.get('#login-button').click()
      cy.contains('tomi west logged-in')
    })
    it('Blog can be created', function () {
      cy.contains('new blog').click()

      cy.get('#title').type('created blog')
      cy.get('#author').type('tomi west')
      cy.get('#url').type('www.anywebsite.com')

      cy.get('#create-button').click()
      cy.contains('created blog tomi west')

      describe('likes button adds likes', function () {
        cy.contains('view').click()
        cy.contains('likes 0')
        cy.contains('like').click()

        cy.contains('likes 1')
      })

      describe('user who created blog can delete it', function () {
        cy.contains('remove').click()
        cy.contains('created blog tomi west').should('not.exist')
      })
    })
  })
})
