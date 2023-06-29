import { memo, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { Text, TextAlign } from 'shared/ui/Text/Text'
import {
    getArticleDetailsData,
    getArticleDetailsError,
    getArticleDetailsIsLoading,
} from '../../model/selectors/articleDetails'
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById'
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice'
import cls from './ArticleDetails.module.scss'

interface IArticleDetailsProps {
    className?: string
    id: string
}

const asyncReducers: TReducerLIst = {
    articleDetails: articleDetailsReducer,
}

export const ArticleDetails = memo((props: IArticleDetailsProps) => {
    const { className, id } = props

    const { t } = useTranslation('article-details')

    const dispatch = useAppDispatch()
    const isLoading = useSelector(getArticleDetailsIsLoading)
    const article = useSelector(getArticleDetailsData)
    const error = useSelector(getArticleDetailsError)

    useEffect(() => {
        dispatch(fetchArticleById(id))
    }, [dispatch, id])

    let content

    if (isLoading) {
        content = (
            <>
                <Skeleton className={cls.avatar} width={200} height={200} border="50%" />
                <Skeleton className={cls.title} width={300} height={32} />
                <Skeleton className={cls.skeleton} width={600} height={24} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
                <Skeleton className={cls.skeleton} width="100%" height={200} />
            </>
        )
    } else if (error) {
        content = <Text align={TextAlign.CENTER} title={t('Произошла ошибка при загрузке статьи')} />
    } else {
        content = <div>ARTICLE DETAILS</div>
    }

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.articleDetails, {}, [className])}>{content}</div>
        </DynamicModuleLoader>
    )
})
