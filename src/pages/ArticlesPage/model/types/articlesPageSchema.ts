import { EntityState } from '@reduxjs/toolkit'
import { IArticle, EArticleView } from 'entities/Article'

export interface IArticlesPageSchema extends EntityState<IArticle> {
    isLoading?: boolean
    error?: string

    view: EArticleView
    // pagination
    page: number
    limit?: number
    hasMore: boolean

    // Флаг, который после первого захода нас траницу статей меняется на true, чтобы если мы вернулись на эту страницу с другой страницы у нас не происходил повторный фетчинг статей с сервера
    _inited: boolean
}
