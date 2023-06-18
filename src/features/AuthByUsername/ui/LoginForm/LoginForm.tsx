import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { classNames } from 'shared/lib/classNames/classNames'
import { Button } from 'shared/ui/Button'
import { ButtonTheme } from 'shared/ui/Button/ui/Button'
import { Input } from 'shared/ui/Input/Input'
import { Text, TextTheme } from 'shared/ui/Text/Text'
import { DynamicModuleLoade, TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { loginByUsername } from '../../services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import cls from './LoginForm.module.scss'

export interface ILoginFormProps {
    className?: string
}

const initialReducers: TReducerLIst = {
    loginForm: loginReducer,
}

const LoginForm = ({ className }: ILoginFormProps) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
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

    const onLoginClick = useCallback(() => {
        dispatch(loginByUsername({ username, password }))
    }, [dispatch, username, password])

    return (
        // Асинхронная загрузка редюсора
        // ТОлько при монтировании LoginForm мы добавляем loginReducer в стор
        // Т.к. LoginForm асинхронный, то и редюсор будет подгружаться асинхронно
        // loginReducer изолирован внутри фичи AuthByUsername
        // eslint-disable-next-line i18next/no-literal-string
        <DynamicModuleLoade asyncReducers={initialReducers} removeAfterUnmount={true}>
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

                <Button
                    className={cls.loginBtn}
                    theme={ButtonTheme.OUTLINE}
                    onClick={onLoginClick}
                    disabled={isLoading}
                >
                    {t('Войти')}
                </Button>
            </div>
        </DynamicModuleLoade>
    )
}

export default LoginForm
