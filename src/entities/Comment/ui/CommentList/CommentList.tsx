import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { IComment } from '../../model/types/comment'
import { CommentCard } from '../CommentCard/CommentCard'
import cls from './CommentList.module.scss'

interface ICommentListProps {
    className?: string
    comments?: IComment[]
    isLoading?: boolean
}

export const CommentList = memo((props: ICommentListProps) => {
    const { className, isLoading, comments } = props
    const { t } = useTranslation()

    return (
        <div className={classNames(cls.commentList, {}, [className])}>
            {comments?.length ? (
                comments.map((comment) => (
                    <CommentCard className={cls.comment} comment={comment} key={comment.id} isLoading={isLoading} />
                ))
            ) : (
                <Text text={t('Комментарии отсутствуют')} />
            )}
        </div>
    )
})
