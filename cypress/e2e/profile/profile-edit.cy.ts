let profileId = ''

describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        // Просто заходим на сайт, не
        cy.visit('')
        cy.login().then((data) => {
            // Получаем IUser, вытаскиваем из него id
            profileId = data.id

            // Переходим на страницу профайла самого пользователя (авторизованного пользователя)
            // cy.visit(`profile/${data.id}`)
            cy.visit(`profile/${data.id}`)
        })
    })

    // Возвращаем данные в БД на сервере к исходныому виду
    // resetProfile писали сами
    afterEach(() => {
        cy.resetProfile(profileId)
    })

    it('И профиль успешно загружается', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'test')
    })

    it('И редактирует его', () => {
        const newName = 'new'
        const newLastname = 'lastname'
        // Мы сами писали фукнцию updateProfile
        cy.updateProfile(newName, newLastname)

        // Проверяем, что значения в инпутах изменились
        cy.getByTestId('ProfileCard.firstname').should('have.value', newName)
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname)
    })
})
