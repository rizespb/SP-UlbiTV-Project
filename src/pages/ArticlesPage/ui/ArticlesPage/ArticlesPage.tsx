import { ArticleList, ArticleViewSelector, EArticleView } from 'entities/Article'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'
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

    useInitialEffect(() => {
        disptach(fetchArticlesList())
        disptach(articlesPageActions.initState())
    })

    // eslint-disable-next-line i18next/no-literal-string
    return (
        <DynamicModuleLoader asyncReducers={asyncReducers}>
            <div className={classNames(cls.articlesPage, {}, [className])}>
                <ArticleViewSelector view={view} onViewClick={onChangeView} />

                <ArticleList isLoading={isLoading} view={view} articles={articles} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
