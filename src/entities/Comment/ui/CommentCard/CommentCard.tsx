import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink } from '@/shared/ui/depricated/AppLink'
import { Avatar } from '@/shared/ui/depricated/Avatar'
import { Skeleton } from '@/shared/ui/depricated/Skeleton'
import { VStack } from '@/shared/ui/depricated/Stack'
import { Text } from '@/shared/ui/depricated/Text'
import { IComment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'
import { getRouteProfile } from '@/shared/const/router'

interface ICommentCardProps {
    className?: string
    comment?: IComment
    isLoading?: boolean
}

export const CommentCard = memo((props: ICommentCardProps) => {
    const { className, comment, isLoading } = props

    if (isLoading) {
        return (
            <VStack
                data-testid="CommentCard.Loading"
                gap="8"
                max
                className={classNames(cls.commentCard, {}, [
                    className,
                    cls.loading,
                ])}
            >
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton
                        width={100}
                        height={16}
                        className={cls.username}
                    />
                </div>

                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <VStack
            data-testid="CommentCard.Content"
            max
            gap="8"
            className={classNames(cls.commentCard, {}, [className])}
        >
            <AppLink
                to={getRouteProfile(comment.user.id)}
                className={cls.header}
            >
                {comment.user.avatar ? (
                    <Avatar size={30} src={comment.user.avatar} />
                ) : null}

                <Text className={cls.username} title={comment.user.username} />
            </AppLink>

            <Text className={cls.text} text={comment.text} />
        </VStack>
    )
})
