import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input'
import { Text as TextDeprecated, ETextTheme } from '@/shared/ui/deprecated/Text'
import { Text } from '@/shared/ui/redesigned/Text'
import {
    DynamicModuleLoader,
    TReducerLIst,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername'
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword'
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading'
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError'
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername'
import { loginActions, loginReducer } from '../../model/slice/loginSlice'
import cls from './LoginForm.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'
import { Input } from '@/shared/ui/redesigned/Input'
import { VStack } from '@/shared/ui/redesigned/Stack'

export interface ILoginFormProps {
    className?: string
    onSuccess: () => void
}

const initialReducers: TReducerLIst = {
    loginForm: loginReducer,
}

const LoginForm = memo(({ className, onSuccess }: ILoginFormProps) => {
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
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess()
        }
    }, [onSuccess, dispatch, password, username])

    return (
        <DynamicModuleLoader removeAfterUnmount asyncReducers={initialReducers}>
            <ToggleFeatures
                feature="isAppRedesigned"
                on={
                    <VStack
                        gap="16"
                        className={classNames(cls.LoginForm, {}, [className])}
                    >
                        <Text title={t('Форма авторизации')} />
                        {error && (
                            <Text
                                text={t('Вы ввели неверный логин или пароль')}
                                variant="error"
                            />
                        )}
                        <Input
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите имя')}
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
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </Button>
                    </VStack>
                }
                off={
                    <div className={classNames(cls.LoginForm, {}, [className])}>
                        <TextDeprecated title={t('Форма авторизации')} />
                        {error && (
                            <TextDeprecated
                                text={t('Вы ввели неверный логин или пароль')}
                                theme={ETextTheme.ERROR}
                            />
                        )}
                        <InputDeprecated
                            autofocus
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите имя')}
                            onChange={onChangeUsername}
                            value={username}
                        />
                        <InputDeprecated
                            type="text"
                            className={cls.input}
                            placeholder={t('Введите пароль')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <ButtonDeprecated
                            theme={EButtonTheme.OUTLINE}
                            className={cls.loginBtn}
                            onClick={onLoginClick}
                            disabled={isLoading}
                        >
                            {t('Войти')}
                        </ButtonDeprecated>
                    </div>
                }
            />
        </DynamicModuleLoader>
    )
})

export default LoginForm
