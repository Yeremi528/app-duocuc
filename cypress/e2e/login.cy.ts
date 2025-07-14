describe('Login - correcto', () => {
    it('Inicia sesión correctamente', () => {
        cy.visit("/login")

        cy.get('input[type="email"]').type("test@test.com")
        cy.get('input[type="password"').type("123456")

        cy.contains('Login').click({force:true});
        

        cy.url({timeout:5000}).should('include', 'tabs/home')
    })
})