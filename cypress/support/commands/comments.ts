// Добавление комментария
export const addComment = (text: string) => {
    // находим инпут и печатам в нем
    cy.getByTestId('AddCommentForm.Input').type(text)

    // Сохраняем
    cy.getByTestId('AddCommentForm.Button').click()
}

declare global {
    namespace Cypress {
        interface Chainable {
            addComment(text: string): Chainable<void>
        }
    }
}
