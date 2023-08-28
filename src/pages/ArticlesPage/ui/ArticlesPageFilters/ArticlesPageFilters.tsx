import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { EArticleSortField, EArticleView, EArticleType } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Card } from '@/shared/ui/Card'
import { Input } from '@/shared/ui/Input'
import { TSortOrder } from '@/shared/types/sort'
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebounce'
import { articlesPageActions } from '../../model/slices/articlesPageSlice'
import {
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'
import cls from './ArticlesPageFilters.module.scss'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
import { ArticleSortSelector } from '@/features/ArticleSortSelector'
import { ArticleViewSelector } from '@/features/ArticleViewSelector'
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs'

interface IArticlesPageFiltersProps {
    className?: string
}

export const ArticlesPageFilters = memo((props: IArticlesPageFiltersProps) => {
    const { className } = props
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const view = useSelector(getArticlesPageView)
    const sort = useSelector(getArticlesPageSort)
    const order = useSelector(getArticlesPageOrder)
    const search = useSelector(getArticlesPageSearch)
    const type = useSelector(getArticlesPageType)

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

    return (
        <div className={classNames(cls.articlesPageFilters, {}, [className])}>
            <div className={cls.sortWrapper}>
                <ArticleSortSelector
                    order={order}
                    sort={sort}
                    onChangeOrder={onChangeOrder}
                    onChangeSort={onChangeSort}
                />

                <ArticleViewSelector view={view} onViewClick={onChangeView} />
            </div>

            <Card className={cls.search}>
                <Input onChange={onChangeSearch} value={search} placeholder={t('Поиск')} />
            </Card>

            <ArticleTypeTabs value={type} onChangeType={onChangeType} className={cls.tabs} />
        </div>
    )
})
