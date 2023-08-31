let currentArticleId = ''

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        // Логинимся
        cy.login()

        // Создаем тестовую статью в БД на сервере
        cy.createArticle().then((article) => {
            currentArticleId = article.id
            cy.visit(`articles/${article.id}`)
        })
    })

    // После каждого теста удаляем созданную в БД на сервере статью в beforeEach
    afterEach(() => {
        cy.removeArticle(currentArticleId)
    })

    it('И видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist')
    })

    it('И видит список рекоммендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist')
    })

    it('И оставляет комментарий', () => {
        // Дожидаемся отрисовки самой статьи
        cy.getByTestId('ArticleDetails.Info')

        // Скролим к блоку Добавить комментарий
        cy.getByTestId('AddCommentForm').scrollIntoView()

        // Добавляем комментарий
        cy.addComment('Test comment text')

        // До этого комментариев не было, теперь один коммент должен появится
        cy.getByTestId('CommentCard.Content').should('have.length', 1)
    })

    it('И ставит оценку', () => {
        // Дожидаемся загрузки статьи
        cy.getByTestId('ArticleDetails.Info')

        // Находим блок Рейтинг и скроллим до него
        cy.getByTestId('RatingCard').scrollIntoView()

        cy.setRate(4, 'feedback')

        // Должно быть выбрано 4 звезды
        cy.get('[data-selected=true]').should('have.length', 4)
    })

    // Пример выставления рейтинга на фикстурах (см. cypress/fixxtures/README.md)
    it('И ставит оценку (пример с стабом на фикстурах)', () => {
        // Перехватываем запрос и возвращаем фикстуру
        cy.intercept('GET', '**/articles/*', {
            fixture: 'article-details.json',
        })
        cy.getByTestId('ArticleDetails.Info')

        // Скроллим до рейтинга
        cy.getByTestId('RatingCard').scrollIntoView()

        // Ставим оценку и пишем фидбэк
        cy.setRate(4, 'feedback')

        // Должно быть выбрано 4 звезды
        cy.get('[data-selected=true]').should('have.length', 4)
    })
})
