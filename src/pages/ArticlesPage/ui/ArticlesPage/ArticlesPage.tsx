import { ArticleList, ArticleViewSelector, EArticleView } from 'entities/Article'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageActions, articlesPageReducer, getArticles } from '../../model/slices/articlesPageSlice'
import {
    getArticlesPageIsLoading,
    getArticlesPageView,
    getArticlesPageError,
} from '../../model/selectors/articlesPageSelectors'
import cls from './ArticlesPage.module.scss'

interface IArticlesPageProps {
    className?: string
}

const asyncReducers: TReducerLIst = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: IArticlesPageProps) => {
    const { className } = props
    const { t } = useTranslation('articles')

    const disptach = useAppDispatch()
    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    const onChangeView = useCallback(
        (view: EArticleView) => {
            disptach(articlesPageActions.setView(view))
        },
        [disptach],
    )

    // Подгрузка статей при скролле
    const onLoadNextPart = useCallback(() => {
        disptach(fetchNextArticlesPage())
    }, [disptach])

    useInitialEffect(() => {
        disptach(initArticlesPage())
    })

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />

                <ArticleList isLoading={isLoading} view={view} articles={articles} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
