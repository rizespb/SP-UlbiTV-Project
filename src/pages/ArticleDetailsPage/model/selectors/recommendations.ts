import { IStateSchema } from 'app/providers/StoreProvider'

export const getArticleRecommendationsIsLoading = (state: IStateSchema) =>
    state.articleDetailsPage?.recommendations.isLoading

export const getArticleRecommendationsError = (state: IStateSchema) => state.articleDetailsPage?.recommendations.error
