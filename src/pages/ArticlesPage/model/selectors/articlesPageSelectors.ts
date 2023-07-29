import { IStateSchema } from 'app/providers/StoreProvider'
import { EArticleView } from 'entities/Article'

export const getArticlesPageIsLoading = (state: IStateSchema) => state.articlesPage?.isLoading || false
export const getArticlesPageError = (state: IStateSchema) => state.articlesPage?.error
export const getArticlesPageView = (state: IStateSchema) => state.articlesPage?.view || EArticleView.SMALL
export const getArticlesPageNum = (state: IStateSchema) => state.articlesPage?.page || 1
export const getArticlesPageLimit = (state: IStateSchema) => state.articlesPage?.limit || 9
export const getArticlesPageHasMore = (state: IStateSchema) => state.articlesPage?.hasMore
export const getArticlesPageInited = (state: IStateSchema) => state.articlesPage?._inited
