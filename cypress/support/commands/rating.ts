// Установить рейтинг
export const setRate = (starsCount = 5, feedback = 'feedback') => {
    // Находим звезду, соответствующую рейтингу и кликаем по ней (установили рейтинг)
    cy.getByTestId(`StarRating.${starsCount}`).click()

    // Находим инпуцт для отзыва, печатаем в нем отзыв
    cy.getByTestId('RatingCard.Input').type(feedback)

    // Нажимаем кнопку Отправить
    cy.getByTestId('RatingCard.Send').click()
}

declare global {
    namespace Cypress {
        interface Chainable {
            setRate(starsCount: number, feedback: string): Chainable<void>
        }
    }
}
