describe('Perfil del usuario funciona correctamente', () => {
    beforeEach(() => {
        localStorage.setItem("email", "test@test.com")
        localStorage.setItem("token", "true")
        cy.visit("/tabs/profile")
    })

    it("Carga bien el perfil y el correo", () => {

        cy.contains('test@test.com').should("exist")

    })
})