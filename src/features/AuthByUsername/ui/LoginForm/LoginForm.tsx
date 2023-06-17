import { loginActions } from 'features/AuthByUsername'
import { loginByUsername } from 'features/AuthByUsername/services/loginByUsername/loginByUsername'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button'
import { ButtonTheme } from 'shared/ui/Button/ui/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState'
import cls from './LoginForm.module.scss'

interface LoginFormProps {
    className?: string
}

export const LoginForm = ({ className }: LoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const { username, password, isLoading, error } = useSelector(getLoginState)

    const onChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginActions.setUsername(value))
        },
        [dispatch],
    )

    const onChangePassword = useCallback(
        (value: string) => {
            dispatch(loginActions.setPassword(value))
        },
        [dispatch],
    )

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, username, password])

    return (
        <div className={classNames(cls.LoginForm, {}, [className])}>
            <Text title={t('Форма авторизации')} />

            {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={TextTheme.ERROR} />}

            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите имя')}
                autofocus={true}
                onChange={onChangeUsername}
                value={username}
            />
            <Input
                type="text"
                className={cls.input}
                placeholder={t('Введите пароль')}
                onChange={onChangePassword}
                value={password}
            />

            <Button className={cls.loginBtn} theme={ButtonTheme.OUTLINE} onClick={onLoginClick} disabled={isLoading}>
                {t('Войти')}
            </Button>
        </div>
    )
}
