import { classNames } from 'shared/lib/classNames/classNames'
import React, { memo, useCallback, useState } from 'react'
import { Icon } from 'shared/ui/Icon/Icon'
import NotificationIcon from 'shared/assets/icons/notification-20-20.svg'
import { NotificationList } from 'entities/Notification'
import { Popover } from 'shared/ui/popups'
import { Button, EButtonTheme } from 'shared/ui/Button'
import { Drawer } from 'shared/ui/Drawer/Drawer'
import { BrowserView, MobileView } from 'react-device-detect'
import cls from './NotificationButton.module.scss'

interface NotificationButtonProps {
    className?: string
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
    const { className } = props

    const [isOpen, setIsOpen] = useState(false)

    const onOpenDrawer = useCallback(() => {
        setIsOpen(true)
    }, [])
    const onCloseDrawer = useCallback(() => {
        setIsOpen(false)
    }, [])

    // кнопка для открытия попап или drawer (шторка снизу для мобильных устройств)
    // onOpenDrawer открывает Drawer (шторку) на мобилках. Если у нас десктоп, то Drawer в принципе отсутствует в DOM и изменение isOpen не на что не влияет
    const trigger = (
        <Button onClick={onOpenDrawer} theme={EButtonTheme.CLEAR}>
            <Icon Svg={NotificationIcon} inverted />
        </Button>
    )

    return (
        <div>
            {/* Определяет размер экрана: только для десктопа
            Ориентируется на user-agent пользователя и при ресайз не отслеживается  */}
            <BrowserView>
                {/* Откроется popup с уведомлениями.
            popup из библиотеки @headlessui и обработка клика происходит внутри библиотеки 
            trigger - кнопка для открытия попап
            */}

                <Popover
                    className={classNames(cls.notificationButton, {}, [className])}
                    direction="bottom left"
                    trigger={trigger}
                >
                    <NotificationList className={cls.notifications} />
                </Popover>
            </BrowserView>

            {/* Определяет размер экрана: только для мобилок
             Ориентируется на user-agent пользователя и при ресайз не отслеживается
              */}
            <MobileView>
                {trigger}

                <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
                    <NotificationList />
                </Drawer>
            </MobileView>
        </div>
    )
})
