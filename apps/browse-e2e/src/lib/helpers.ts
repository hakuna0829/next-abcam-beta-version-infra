export const handleException = () => {
  cy.on('uncaught:exception', function (error) {
    if (error.message.includes("Cannot set property 'status' of undefined")) {
      return false
    }
  })
}
