import { memo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    TReducerLIst,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from '@/shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from '@/widgets/Page'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'

import cls from './ArticlesPage.module.scss'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'
import { ArticlePageGreeting } from '@/features/articlePageGreeting'
import { ToggleFeatures } from '@/shared/lib/features'
import { StickyContentLayout } from '@/shared/layouts/StickyContentLayout'
import { ViewSelectorContainer } from '../ViewSelectorContainer/ViewSelectorContainer'
import { FiltersContainer } from '../FiltersContainer/FiltersContainer'

interface IArticlesPageProps {
    className?: string
}

const asyncReducers: TReducerLIst = {
    articlesPage: articlesPageReducer,
}

const ArticlesPage = (props: IArticlesPageProps) => {
    const { className } = props
    // const { t } = useTranslation('articles')

    const disptach = useAppDispatch()
    const [searchParams] = useSearchParams()

    // Подгрузка статей при скролле
    const onLoadNextPart = useCallback(() => {
        // Мой код, чтобы избежать баг в Сторибуке
        if (__PROJECT__ !== 'storybook') {
            disptach(fetchNextArticlesPage())
        }
    }, [disptach])

    useInitialEffect(() => {
        disptach(initArticlesPage(searchParams))
    })

    const content = (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <StickyContentLayout
                    left={<ViewSelectorContainer />}
                    right={<FiltersContainer />}
                    content={
                        <Page
                            data-testid="ArticlesPage"
                            onScrollEnd={onLoadNextPart}
                            className={classNames(
                                cls.ArticlesPageRedesigned,
                                {},
                                [className],
                            )}
                        >
                            <ArticleInfiniteList className={cls.list} />

                            {/* Привественное сообщение на странице статей.
Показывается один раз при первой авторизации пользователя */}
                            <ArticlePageGreeting />
                        </Page>
                    }
                />
            }
            off={
                <Page
                    data-testid="ArticlesPage"
                    onScrollEnd={onLoadNextPart}
                    className={classNames(cls.articlesPage, {}, [className])}
                >
                    <ArticlesPageFilters />

                    <ArticleInfiniteList className={cls.list} />

                    {/* Привественное сообщение на странице статей.
Показывается один раз при первой авторизации пользователя */}
                    <ArticlePageGreeting />
                </Page>
            }
        />
    )

    return (
        <DynamicModuleLoader
            asyncReducers={asyncReducers}
            removeAfterUnmount={false}
        >
            {content}
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
