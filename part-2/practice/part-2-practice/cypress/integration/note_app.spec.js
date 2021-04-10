describe('Note app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Gerhard Molin',
          username: 'gerry',
          password: 'sardinen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front page can be opened', function() {
      cy.contains('Notes')
    })

    it('login can be opened', function() {
        cy.contains('login').click()
    })

    it('user can login', function() {
        cy.contains('login').click()
        cy.get('#login-username').type('gerry')
        cy.get('#login-password').type('sardinen')
        cy.get('#login-submit').click()
        cy.contains('Gerhard Molin logged in')
    })

    it('login fails with wrong password', function() {
        cy.contains('login').click()
        cy.get('#login-username').type('gerry')
        cy.get('#login-password').type('false')
        cy.get('#login-submit').click()
    })

    describe('when logged in', function() {
        beforeEach(function() {
            cy.contains('login').click()
            cy.get('#login-username').type('gerry')
            cy.get('#login-password').type('sardinen')
            cy.get('#login-submit').click()
            cy.contains('Login')
        })

        it('a new note can be created', function() {
            cy.contains('create note').click()
            cy.get('#input-note').type('a note created by cypress')
            cy.contains('save').click()
            cy.contains('a note created by cypress')
        })
        
        describe('and a note exists', function () {
            beforeEach(function() {
                cy.contains('create note').click()
                cy.get('#input-note').type('first note')
                cy.contains('save').click()

                cy.contains('create note').click()
                cy.get('#input-note').type('second note')
                cy.contains('save').click()

                cy.contains('create note').click()
                cy.get('#input-note').type('third note')
                cy.contains('save').click()
            })
            it('other of those can be made important', function () {
                cy.contains('second note')
                  .parent()
                  .find('button')
                  .as('theButton')
                cy.get('@theButton').click()
        
                cy.get('@theButton')
                .should('contain', 'make not important')
              })
        })
    })
  })