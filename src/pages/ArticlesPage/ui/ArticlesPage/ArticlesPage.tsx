import { memo, useCallback } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Page } from 'widgets/Page/Page'
import { useSearchParams } from 'react-router-dom'
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage'
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage'
import { articlesPageReducer } from '../../model/slices/articlesPageSlice'

import cls from './ArticlesPage.module.scss'
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters'
import { ArticleInfiniteList } from '../ArticleInfiniteList/ArticleInfiniteList'

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

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount={false}>
            <Page onScrollEnd={onLoadNextPart} className={classNames(cls.articlesPage, {}, [className])}>
                <ArticlesPageFilters />

                <ArticleInfiniteList className={cls.list} />
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticlesPage)
