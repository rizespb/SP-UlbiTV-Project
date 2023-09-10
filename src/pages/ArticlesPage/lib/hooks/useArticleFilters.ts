import { useSelector } from 'react-redux'
import { useCallback } from 'react'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import {
    EArticleSortField,
    EArticleType,
    EArticleView,
} from '@/entities/Article'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import { TSortOrder } from '@/shared/types/sort'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'

export function useArticleFilters() {
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

    const dispatch = useAppDispatch()

    // Отправка запроса при вводе данных в поле Поиск
    const fetchData = useCallback(() => {
        dispatch(fetchArticlesList({ replaced: true }))
    }, [dispatch])

    const debouncedFetchData = useDebounce(fetchData, 500)

    const onChangeView = useCallback(
        (view: EArticleView) => {
            dispatch(articlesPageActions.setView(view))
        },
        [dispatch],
    )

    const onChangeSort = useCallback(
        (newSort: EArticleSortField) => {
            dispatch(articlesPageActions.setSort(newSort))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeOrder = useCallback(
        (newOrder: TSortOrder) => {
            dispatch(articlesPageActions.setOrder(newOrder))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    const onChangeSearch = useCallback(
        (search: string) => {
            dispatch(articlesPageActions.setSearch(search))
            dispatch(articlesPageActions.setPage(1))
            debouncedFetchData()
        },
        [dispatch, debouncedFetchData],
    )

    const onChangeType = useCallback(
        (value: EArticleType) => {
            dispatch(articlesPageActions.setType(value))
            dispatch(articlesPageActions.setPage(1))
            fetchData()
        },
        [dispatch, fetchData],
    )

    return {
        view,
        sort,
        order,
        search,
        type,
        onChangeView,
        onChangeSort,
        onChangeOrder,
        onChangeSearch,
        onChangeType,
    }
}
