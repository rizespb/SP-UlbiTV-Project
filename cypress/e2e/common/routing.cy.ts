import { selectByTestId } from '../../helpers/selectByTestId'

// в cypress.config.ts задали базовый адрес (хост сайта) и тпереь в visit можем указывать относительные адреса без хоста
describe('Роутинг', () => {
    describe('Пользователь НЕ авторизован', () => {
        // Проверяем, что по основному адресу открывается главная страница
        it('Переход на главную страницу', () => {
            cy.visit('/')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        // Если пользователь неавторизован, то он должен попасть на главную страницу (редирект)
        it('Переход открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('MainPage')).should('exist')
        })

        it('Переход открывает несуществующий маршрут ', () => {
            cy.visit('/fasfasfasf')
            cy.get(selectByTestId('NotFoundPage')).should('exist')
        })
    })

    describe('Пользователь авторизован', () => {
        // Перед каждым тестом авторизуемся
        beforeEach(() => {
            cy.login()
        })

        it('Переход открывает страницу профиля', () => {
            cy.visit('/profile/1')
            cy.get(selectByTestId('ProfilePage')).should('exist')
        })

        it('Переход открывает страницу со списком статей', () => {
            cy.visit('/articles')
            cy.get(selectByTestId('ArticlesPage')).should('exist')
        })
    })
})
