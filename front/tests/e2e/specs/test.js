// https://docs.cypress.io/api/introduction/api.html

Cypress.Commands.add('login',()=> {
  const options = {
    method: 'POST',
  url: 'http://localhost:3000/login',
  body: {
      email: 'admin@admin.com',
      pass: '1234',
  }
  }
  cy.request(options).then(resp => {
    localStorage.setItem('token', resp.body.token)
  })
});

describe('My First Test', () => {
  before('Login', () => {
    cy.visit('/')
    cy.get('.login').click()
    cy.url().should('include', '/login')
    cy.get('#InputEmail1')
      .type('admin@admin.com')
    cy.get('#InputPassword1')
      .type('1234')
    cy.get('#login').click({ force: true })
  });
  
  it('Add a post', () => {
    cy.contains('Publicar').click()
    cy.get('.title')
    .type('Esto es un post con Cypress')
    cy.get('.description')
    .type('Esta es la descripción con Cypress')
    cy.get('.text')
    .type('Pues eso, un post con Cypress')
    cy.get('.publish').click()
  });

  it('goes to first post and add a comment whitout diry words',() =>{
    cy.login()
    cy.contains('Posts').click()
    cy.contains('post').click()
    cy.get('.textComment').type('Comentario de prueba sin palabras ofensivas', { force: true })
    cy.get('.button').click({ force: true })
  });

  it('goes to first post and add a comment whit diry words',() =>{
    cy.login()
    cy.contains('Posts').click()
    cy.contains('post').click()
    cy.get('.textComment').type('Lo veo todo muy negro', { force: true })
    cy.get('.button').click({ force: true })
  });

});