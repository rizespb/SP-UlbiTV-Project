import { CommentList } from 'entities/Comment'
import { AddCommentForm } from 'features/addCommentForm'
import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { ETextSize, Text } from 'shared/ui/Text/Text'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { useInitialEffect } from 'shared/lib/hooks/useInitialEffect/useInitialEffect'
import { VStack } from 'shared/ui/Stack'
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle'
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice'
import { getArticleCommentsIsLoading } from '../../model/selectors/comments'

interface IArticleDetailsCommentProps {
    className?: string
    id: string
}

export const ArticleDetailsComment = memo((props: IArticleDetailsCommentProps) => {
    const { className, id } = props
    const { t } = useTranslation('article-details')
    const dispatch = useAppDispatch()

    const comments = useSelector(getArticleComments.selectAll)
    const commentsIsLoading = useSelector(getArticleCommentsIsLoading)

    useInitialEffect(() => {
        dispatch(fetchCommentsByArticleId(id))
    })

    const onSendComment = useCallback(
        (text: string) => {
            dispatch(addCommentForArticle(text))
        },
        [dispatch],
    )

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            <Text size={ETextSize.L} title={t('Комментарии')} />

            <AddCommentForm onSendComment={onSendComment} />

            <CommentList isLoading={commentsIsLoading} comments={comments} />
        </VStack>
    )
})
