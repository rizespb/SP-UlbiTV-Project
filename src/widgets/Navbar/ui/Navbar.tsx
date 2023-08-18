/* eslint-disable indent */
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { LoginModal } from '@/features/AuthByUsername'
import { getUserAuthData } from '@/entities/User'
import { RoutePath } from '@/shared/config/routerConfig/routerConfig'
import { classNames } from '@/shared/lib/classNames/classNames'
import { AppLink, EAppLinkTheme } from '@/shared/ui/AppLink/AppLink'
import { Button, EButtonTheme } from '@/shared/ui/Button'
import { HStack } from '@/shared/ui/Stack'
import { ETextTheme, Text } from '@/shared/ui/Text/Text'
import { NotificationButton } from '@/features/notificationButton'
import { AvatarDropdown } from '@/features/avatarDropdown'
import cls from './Navbar.module.scss'

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

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={t('Interesting App')} theme={ETextTheme.INVERTED} />

                <AppLink to={RoutePath.article_create} theme={EAppLinkTheme.SECONDARY} className={cls.createBtn}>
                    {t('Создать статью')}
                </AppLink>

                <HStack gap="16" className={cls.actions}>
                    <NotificationButton />

                    <AvatarDropdown />
                </HStack>
            </header>
        )
    }

    return (
        <header className={classNames(cls.Navbar, {}, [className])}>
            <Button theme={EButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={onShowModal}>
                {t('Войти')}
            </Button>

            {isAuthModal && <LoginModal isOpen={isAuthModal} onClose={onCloseModal} />}
        </header>
    )
})
