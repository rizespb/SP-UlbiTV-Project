import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

// В createReduxStore надо добавить редюсор для rtkApi
export const rtkApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem(USER_LOCALSTORAGE_KEY) || ''
            if (token) {
                headers.set('Authorization', token)
            }
            return headers
        },
    }),
    // Оставляем пустую функцию. Будем инжектить эндпоинты при необходимости в тех местах, где они нужны
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endpoints: (builder) => ({}),
})
