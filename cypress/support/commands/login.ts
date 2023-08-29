import { USER_LOCALSTORAGE_KEY } from '../../../src/shared/const/localstorage'

// Описываем запрос, который выполнит cyress и в then пишем, что сделать, если получен успешный ответ от сервера
// В базе данных на сервере надо заранее создать тестового пользователя testuser, чтобы запрос выолнялся успешно
export const login = (username: string = 'testuser', password: string = '123') => {
    // мокаем запрос - буквально создаем запрос, который cypress отправит к запущенному (нашему рабочему) дев-серверу
    cy.request({
        method: 'POST',
        url: 'http://localhost:8000/login',
        body: {
            username,
            password,
        },
    }).then(({ body }) => {
        // в then пишем, что сделать, если получен успешный ответ от сервера
        window.localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(body))
    })
}
