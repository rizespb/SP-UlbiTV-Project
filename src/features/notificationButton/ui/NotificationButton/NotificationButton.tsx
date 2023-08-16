import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo } from 'react'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'
import { Popover } from 'shared/ui/popups'
import { Button, EButtonTheme } from 'shared/ui/Button'
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props

    return (
        <Popover
            className={classNames(cls.notificationButton, {}, [className])}
            direction="bottom left"
            trigger={
                <Button theme={EButtonTheme.CLEAR}>
                    <Icon Svg={NotificationIcon} inverted />
                </Button>
            }
        >
            <NotificationList className={cls.notifications} />
        </Popover>
    )
})
