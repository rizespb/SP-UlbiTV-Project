import { memo } from 'react'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Skeleton } from 'shared/ui/Skeleton/Skeleton'
import { VStack } from 'shared/ui/Stack'
import { Text } from 'shared/ui/Text/Text'
import { IComment } from '../../model/types/comment'
import cls from './CommentCard.module.scss'

interface ICommentCardProps {
    className?: string
    comment?: IComment
    isLoading?: boolean
}

export const CommentCard = memo((props: ICommentCardProps) => {
    const { className, comment, isLoading } = props

    if (isLoading) {
        return (
            <VStack gap="8" max className={classNames(cls.commentCard, {}, [className, cls.loading])}>
                <div className={cls.header}>
                    <Skeleton width={30} height={30} border="50%" />
                    <Skeleton width={100} height={16} className={cls.username} />
                </div>

                <Skeleton className={cls.text} width="100%" height={50} />
            </VStack>
        )
    }

    if (!comment) {
        return null
    }

    return (
        <VStack max gap="8" className={classNames(cls.commentCard, {}, [className])}>
            <AppLink to={`${RoutePath.profile}${comment.user.id}`} className={cls.header}>
                {comment.user.avatar ? <Avatar size={30} src={comment.user.avatar} /> : null}

                <Text className={cls.username} title={comment.user.username} />
            </AppLink>

            <Text className={cls.text} text={comment.text} />
        </VStack>
    )
})
