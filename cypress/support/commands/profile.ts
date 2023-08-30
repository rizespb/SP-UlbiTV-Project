// Команда, которая редактирует профиль, заменяя имя ит фамилию на переданные в аргументах функции
export const updateProfile = (firstname: string, lastname: string) => {
    // Выбираем кнопку "Редактировать" на странице
    cy.getByTestId('EditableProfileCardHeader.EditButton').click()

    // Получаем инпут для ввода имени. Очищаем его. И печатаем новое имя
    cy.getByTestId('ProfileCard.firstname').clear().type(firstname)

    // Получаем инпут для ввода фамилии. Очищаем его. И печатаем новую фамилию
    cy.getByTestId('ProfileCard.lastname').clear().type(lastname)

    // Нажимаем кнопку сохранить
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click()
}

// Функция для возврата значений профайла в БД на сервере после того, как отредавкировали профиль в тестах
export const resetProfile = (profileId: string) =>
    cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profile/${profileId}`,
        headers: { Authorization: 'asasf' },
        body: {
            description: 'Профиль для тестового пользователя (используем в e2e)',
            id: '4',
            first: 'test',
            lastname: 'user',
            age: 465,
            currency: 'EUR',
            country: 'Ukraine',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    })

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<void>
            resetProfile(profileId: string): Chainable<void>
        }
    }
}
