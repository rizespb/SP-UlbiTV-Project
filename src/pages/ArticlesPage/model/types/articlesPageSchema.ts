import { EntityState } from '@reduxjs/toolkit'
import { IArticle, EArticleView, EArticleSortField, EArticleType } from '@/entities/Article'
import { TSortOrder } from '@/shared/types/sort'

export interface IArticlesPageSchema extends EntityState<IArticle> {
    isLoading?: boolean
    error?: string

    // pagination
    page: number
    limit: number
    hasMore: boolean

    // FILTERS
    // Отображение: плитка или список
    view: EArticleView
    // Порядок сортировки (возрастание / убывание)
    order: TSortOrder
    // По какому свойству сортируем
    sort: EArticleSortField
    search: string
    // Тип статьи (IT, наука, экономика)
    type: EArticleType

    // Флаг, который после первого захода нас траницу статей меняется на true, чтобы если мы вернулись на эту страницу с другой страницы у нас не происходил повторный фетчинг статей с сервера
    _inited: boolean
}
