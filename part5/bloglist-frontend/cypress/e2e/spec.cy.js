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
        cy.get('#remove-button').click()
        cy.contains('created blog tomi west')
      })
    })
    describe('blogs are sorted depending on likes', function () {
      it('add blogs', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('first blog')
        cy.get('#author').type('first first')
        cy.get('#url').type('www.first.com')
        cy.get('#create-button').click()

        cy.get('#title').type('second blog')
        cy.get('#author').type('second west')
        cy.get('#url').type('www.second.com')
        cy.get('#create-button').click()

        cy.get('#title').type('this should be at index 0')
        cy.get('#author').type('index 0')
        cy.get('#url').type('www.index0.com')
        cy.get('#create-button').click()

        cy.wait(1000)
        cy.get('[id^=view-btn').click({ multiple: true })
        cy.get('div').find('#like-button').last().click()

        cy.wait(1000) //withour wait the click doesnt have time to update
        cy.get('[data-testid="hidden-element"]')
          .eq(0)
          .contains('this should be at index 0')
      })
    })
  })
})
