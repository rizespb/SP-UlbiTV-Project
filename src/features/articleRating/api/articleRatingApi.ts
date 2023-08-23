import { rtkApi } from '@/shared/api/rtkApi'
import { IRating } from '@/entities/Rating'

interface IGetArticleRatingArg {
    userId: string
    articleId: string
}

interface IRateArticleArg {
    userId: string
    articleId: string
    rate: number
    feedback?: string
}

const articleRatingApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // Название endpoint-а
        // IRating - такой объект возвращается с сервера
        getArticleRating: build.query<IRating[], IGetArticleRatingArg>({
            query: ({ articleId, userId }) => ({
                url: '/article-ratings',
                // Передаем userId и articleId, чтобы получить нужный рейтинг, чтобы узнать, какой именно рейтинг этой статье поставил текущий пользователь
                params: {
                    userId,
                    articleId,
                },
            }),
        }),

        // Отправить установленный рейтинг на сервер
        // void - не ожидаем возвращаемое значение с сервера
        // IRateArticleArg - интерфейс arg - параметров, передавайемых в фукнцию
        rateArticle: build.mutation<void, IRateArticleArg>({
            query: (arg) => ({
                url: '/article-ratings',
                method: 'POST',
                body: arg,
            }),
        }),
    }),
})

// хук для работы с getArticleRating
export const useGetArticleRating = articleRatingApi.useGetArticleRatingQuery

// хук для работа с rateArticle
export const useRateArticle = articleRatingApi.useRateArticleMutation
