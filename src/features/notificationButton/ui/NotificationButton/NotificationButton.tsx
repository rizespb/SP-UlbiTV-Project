import { memo, useCallback, useState } from 'react'
import { BrowserView, MobileView } from 'react-device-detect'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import NotificationIconDeprecated from '@/shared/assets/icons/notification-20-20.svg'
import NotificationIcon from '@/shared/assets/icons/notification.svg'
import { NotificationList } from '@/entities/Notification'
import { Popover as PopoverDeprecated } from '@/shared/ui/deprecated/popups'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Drawer } from '@/shared/ui/deprecated/Drawer'
import cls from './NotificationButton.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { Icon } from '@/shared/ui/redesigned/Icon'
import { Popover } from '@/shared/ui/redesigned/Popups'

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
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
            }
            off={
                <ButtonDeprecated
                    onClick={onOpenDrawer}
                    theme={EButtonTheme.CLEAR}
                >
                    <IconDeprecated Svg={NotificationIconDeprecated} inverted />
                </ButtonDeprecated>
            }
        />
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

                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={
                        <Popover
                            className={classNames(cls.notificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </Popover>
                    }
                    off={
                        <PopoverDeprecated
                            className={classNames(cls.notificationButton, {}, [
                                className,
                            ])}
                            direction="bottom left"
                            trigger={trigger}
                        >
                            <NotificationList className={cls.notifications} />
                        </PopoverDeprecated>
                    }
                />
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
