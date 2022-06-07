describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })
  // it('front page can be opened', function () {
  //   cy.contains('Blogs')
  //   cy.contains('login')
  // })

  it('login form can be opened', function () {
    cy.contains('login to application').click()
    cy.contains('Blogs')
    cy.contains('login')
    cy.contains('login').click()
  })

  // it('user can login', function () {
  //   cy.contains('login').click()
  //   cy.get('input:first').type('tomi')
  //   cy.get('input:last').type('1234')
  //   cy.get('login').click()
  // })
})
