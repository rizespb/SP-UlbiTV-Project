import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LoginModal } from '@/features/AuthByUsername'
import { getUserAuthData } from '@/entities/User'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, EAppLinkTheme } from '@/shared/ui/deprecated/AppLink'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { ETextTheme, Text } from '@/shared/ui/deprecated/Text'
import { NotificationButton } from '@/features/notificationButton'
import { AvatarDropdown } from '@/features/avatarDropdown'
import cls from './Navbar.module.scss'
import { getRouteArticleCreate } from '@/shared/const/router'
import { toggleFeatures, ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const mainClass = toggleFeatures({
        name: 'isAppRedesigned',
        on: () => cls.NavbarRedesigned,
        off: () => cls.Navbar,
    })

    if (authData) {
        return (
            // Сделали редизайн
            // У некоторых пользователей будет новый дизайн
            // А некоторых оставим старый
            // Регулируется с помощью ФТ isAppRedesigned
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <header className={classNames(mainClass, {}, [className])}>
                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />

                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
                off={
                    <header className={classNames(mainClass, {}, [className])}>
                        <Text
                            className={cls.appName}
                            title={t('Interesting App')}
                            theme={ETextTheme.INVERTED}
                        />

                        <AppLink
                            to={getRouteArticleCreate()}
                            theme={EAppLinkTheme.SECONDARY}
                            className={cls.createBtn}
                        >
                            {t('Создать статью')}
                        </AppLink>

                        <HStack gap="16" className={cls.actions}>
                            <NotificationButton />

                            <AvatarDropdown />
                        </HStack>
                    </header>
                }
            />
        )
    }

    return (
        <header className={classNames(mainClass, {}, [className])}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <Button
                        variant="clear"
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </Button>
                }
                off={
                    <ButtonDeprecated
                        theme={EButtonTheme.CLEAR_INVERTED}
                        className={cls.links}
                        onClick={onShowModal}
                    >
                        {t('Войти')}
                    </ButtonDeprecated>
                }
            />

            {isAuthModal && (
                <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />
            )}
        </header>
    )
})
