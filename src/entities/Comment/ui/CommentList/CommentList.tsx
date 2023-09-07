import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { VStack } from '@/shared/ui/depricated/Stack'
import { Text } from '@/shared/ui/depricated/Text'
import { IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'

interface ICommentListProps {
    className?: string
    comments?: IComment[]
    isLoading?: boolean
}

export const CommentList = memo((props: ICommentListProps) => {
    const { className, isLoading, comments } = props
    const { t } = useTranslation()

    if (isLoading) {
        return (
            <VStack gap="16" max className={classNames('', {}, [className])}>
                <CommentCard isLoading />
                <CommentCard isLoading />
                <CommentCard isLoading />
            </VStack>
        )
    }

    return (
        <VStack gap="16" max className={classNames('', {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard
                        comment={comment}
                        key={comment.id}
                        isLoading={isLoading}
                    />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </VStack>
    )
})
