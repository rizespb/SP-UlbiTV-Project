import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button'
import { EButtonTheme } from 'shared/ui/Button/ui/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, ETextTheme } from 'shared/ui/Text/Text'
import { DynamicModuleLoader, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch'
import { loginByUsername } from '../../services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import cls from './LoginForm.module.scss'

export interface ILoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: TReducerLIst = {
    loginForm: loginReducer,
}

const LoginForm = ({ className, onSuccess }: ILoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useAppDispatch()
    const username = useSelector(getLoginUsername)
    const password = useSelector(getLoginPassword)
    const isLoading = useSelector(getLoginIsLoading)
    const error = useSelector(getLoginError)

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

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByUsername({ username, password }))

        // Ранее модалка не скрывалась при закрытии, т.к. оставалась встроена в браузер. И после авторизации при нажатии на кнопку Выйти снова появляалсь модалка. ПОэтому после успешной авторизации мы вызываем onSuccess (куда передаем такой же колбэк onClose), чтобы убрать модлку из дом-дерева
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [onSuccess, dispatch, username, password])

    return (
        // Асинхронная загрузка редюсора
        // ТОлько при монтировании LoginForm мы добавляем loginReducer в стор
        // Т.к. LoginForm асинхронный, то и редюсор будет подгружаться асинхронно
        // loginReducer изолирован внутри фичи AuthByUsername
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModuleLoader asyncReducers={initialReducers} removeAfterUnmount={true}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Форма авторизации')} />

                {error && <Text text={t('Вы ввели неверный логин или пароль')} theme={ETextTheme.ERROR} />}

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

                <Button
                    className={cls.loginBtn}
                    theme={EButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoader>
    )
}

export default LoginForm
