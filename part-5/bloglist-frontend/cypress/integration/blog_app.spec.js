describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Gerhard Molin Cypress',
            username: 'testGM',
            password: 'testGM'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('front-page can be opened', function() {
        cy.contains('log in to application')
    })

    describe('Testing Login', function() {
        it('user can login', function() {
            cy.get('#login-username').type('testGM')
            cy.get('#login-password').type('testGM')
            cy.get('#login-submit').click()
            cy.contains('Gerhard Molin Cypress\'s Blogs')
        })
    
        it('user cant login with wrong password', function() {
            cy.get('#login-username').type('testGM')
            cy.get('#login-password').type('wrong')
            cy.get('#login-submit').click()
            cy.contains('log in to application')
        })
    })

    describe('Creating/Editing/Deleting Blog post', function() {
        beforeEach(function() {
            cy.get('#login-username').type('testGM')
            cy.get('#login-password').type('testGM')
            cy.get('#login-submit').click()
        })
        it('A blog can be created', function() {
            cy.get('#toggleButton').click()
            cy.get('#input-title').type('A Cypress Blog')
            cy.get('#input-author').type('testGM')
            cy.get('#input-url').type('www.cypress.com')
            cy.get('#blog-create').click()
            cy.contains('A Cypress Blog')
        })
        it('You can like a blog', function() {
            cy.get('#toggleButton').click()
            cy.get('#input-title').type('A Cypress Blog')
            cy.get('#input-author').type('testGM')
            cy.get('#input-url').type('www.cypress.com')
            cy.get('#blog-create').click()
            cy.contains('show more').click()
            cy.contains('like').click()
            cy.contains('Likes: 1')
        })
        it('User can delete a blog', function() {
            cy.get('#toggleButton').click()
            cy.get('#input-title').type('A Cypress Blog')
            cy.get('#input-author').type('testGM')
            cy.get('#input-url').type('www.cypress.com')
            cy.get('#blog-create').click()
            cy.contains('show more').click()
            cy.contains('Delete').click()
            cy.get('#blog').should('not.exist')
        })
    })

})