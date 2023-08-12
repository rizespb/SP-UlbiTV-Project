// Добавление енд-поинтов: добавляем в тех модулях, где мы их сипользуем

import { rtkApi } from 'shared/api/rtkApi'

// Этот ендпоинт в главный чанк не попадает. Попадет в чанк с ArticleRecommendationsList
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // Название ендпоинта
        // Для запроса данных используем query
        // Для мутации данных (POST, PUT, DELET и т.д.) - mutation
        getArticleRecommendationsList: build.query({
            // в функцию передаем лимит - количество статей, которое запрашиваем
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                },
            }),
        }),
    }),
})

// RTQ автоматически генерирует хук для работы с ендпоинтом
export const useArticleRecommendationsList = recommendationsApi.useGetArticleRecommendationsListQuery
