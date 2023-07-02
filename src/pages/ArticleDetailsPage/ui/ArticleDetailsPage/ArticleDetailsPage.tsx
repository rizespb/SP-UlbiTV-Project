import { ArticleDetails } from 'entities/Article'
import { CommentList } from 'entities/Comment'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { Text } from 'shared/ui/Text/Text'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import cls from './ArticleDetailsPage.module.scss'

interface IArticleDetailsPageProps {
    className?: string
}

const asyncReducers: TReducerLIst = {
    articleDetailsComments: articleDetailsCommentsReducer,
}

const ArticleDetailsPage = (props: IArticleDetailsPageProps) => {
    const { className } = props
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()

    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    if (!id) {
        return <div className={classNames(cls.articleDetailsPage, {}, [className])}>{t('Статья не найдена')}</div>
    }

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.articleDetailsPage, {}, [className])}>
                <ArticleDetails id={id} />

                <Text title={t('Комментарии')} className={cls.commentTitle} />

                <CommentList isLoading={commentsIsLoading} comments={comments} />
            </div>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
