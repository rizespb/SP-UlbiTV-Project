// Добавление енд-поинтов: добавляем в тех модулях, где мы их сипользуем

import { IArticle } from '@/entities/Article'
import { rtkApi } from '@/shared/api/rtkApi'

// Этот ендпоинт в главный чанк не попадает. Попадет в чанк с ArticleRecommendationsList
const recommendationsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // Название ендпоинта
        // Для запроса данных используем query
        // Для мутации данных (POST, PUT, DELET и т.д.) - mutation
        // Дженерик - первый аргумент - что возвращает функция, вотрой - тип передаваемого аргумента в функцию (здесь limit)
        getArticleRecommendationsList: build.query<IArticle[], number>({
            // в функцию передаем лимит - количество статей, которое запрашиваем
            query: (limit) => ({
                url: '/articles',
                params: {
                    _limit: limit,
                    _expand: 'user',
                },
            }),
        }),
    }),
})

// RTQ автоматически генерирует хук для работы с ендпоинтом
export const useArticleRecommendationsList =
    recommendationsApi.useGetArticleRecommendationsListQuery
