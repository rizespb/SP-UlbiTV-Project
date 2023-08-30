describe('Пользователь заходит на страницу со списком статей', () => {
    // Перед каждым кейсом логинимся и переходим на страницу со списком статей
    beforeEach(() => {
        cy.login().then((data) => {
            cy.visit('articles')
        })
    })

    it('и статьи успешно подгружаются', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    })

    // Пример получения списка статей на фикстурах (см. cypress/fixxtures/README.md)
    it('На стабах (фикстурах)', () => {
        cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' })
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
    })

    // skip - команда, чтобы пропускать тест
    it.skip('Пример заскипанного теста', () => {
        cy.getByTestId('ArticleList').should('exist')
        cy.getByTestId('ArticleListItem').should('have.length.greaterThan', 3)
        // Такого элемента на странице нет
        cy.get('asfasf').should('exist')
    })
})
