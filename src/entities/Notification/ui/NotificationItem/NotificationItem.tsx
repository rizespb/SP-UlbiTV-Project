import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Card, ECardTheme } from '@/shared/ui/Card'
import { Text } from '@/shared/ui/Text'
import cls from './NotificationItem.module.scss'
import { INotification } from '../../model/types/notification'

interface NotificationItemProps {
    className?: string
    item: INotification
}

export const NotificationItem = memo((props: NotificationItemProps) => {
    const { className, item } = props

    const content = (
        <Card theme={ECardTheme.OUTLINED} className={classNames(cls.notificationItem, {}, [className])}>
            <Text title={item.title} text={item.description} />
        </Card>
    )

    if (item.href) {
        return (
            <a className={cls.link} target="_blank" href={item.href} rel="noreferrer">
                {content}
            </a>
        )
    }

    return content
})
