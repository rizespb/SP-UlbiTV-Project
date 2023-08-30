import * as commonCommands from './commands/common'
import * as profileCommands from './commands/profile'
import * as articleCommands from './commands/article'
import * as commentsCommands from './commands/comments'
import * as ratingCommands from './commands/rating'

// Добавляем объекту Cypress.Commands метод логин. В дальнейшем в тестах будем вызывать его на глобальной переменной cy - cy.login()
// Cypress.Commands.add('login', login)
Cypress.Commands.addAll(commonCommands)
Cypress.Commands.addAll(profileCommands)
Cypress.Commands.addAll(articleCommands)
Cypress.Commands.addAll(commentsCommands)
Cypress.Commands.addAll(ratingCommands)

export {}
