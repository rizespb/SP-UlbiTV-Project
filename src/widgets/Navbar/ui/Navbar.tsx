import { getUserAuthData, userActions } from 'entities/User'
import { LoginModal } from 'features/AuthByUsername'
import { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { classNames } from 'shared/lib/classNames/classNames'
import { AppLink, EAppLinkTheme } from 'shared/ui/AppLink/AppLink'
import { Button, EButtonTheme } from 'shared/ui/Button'
import { ETextTheme, Text } from 'shared/ui/Text/Text'
import cls from './Navbar.module.scss'

interface NavbarProps {
    className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation()
    const [isAuthModal, setIsAuthModal] = useState(false)
    const authData = useSelector(getUserAuthData)
    const dispatch = useDispatch()

    const onCloseModal = useCallback(() => {
        setIsAuthModal(false)
    }, [])

    const onShowModal = useCallback(() => {
        setIsAuthModal(true)
    }, [])

    const onLogOut = useCallback(() => {
        dispatch(userActions.logout())
    }, [dispatch])

    if (authData) {
        return (
            <header className={classNames(cls.Navbar, {}, [className])}>
                <Text className={cls.appName} title={t('Interesting App')} theme={ETextTheme.INVERTED} />

                <AppLink to={RoutePath.article_create} theme={EAppLinkTheme.SECONDARY} className={cls.createBtn}>
                    {t('Создать статью')}
                </AppLink>

                <Button theme={EButtonTheme.CLEAR_INVERTED} className={cls.links} onClick={onLogOut}>
                    {t('Выйти')}
                </Button>
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
