import { login } from './commands/login'

// Добавляем объекту Cypress.Commands метод логин. В дальнейшем в тестах будем вызывать его на глобальной переменной cy - cy.login()
Cypress.Commands.add('login', login)

declare global {
    namespace Cypress {
        interface Chainable {
            login(email?: string, password?: string): Chainable<void>
        }
    }
}

export {}
