describe('Note app', function () {
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
})
