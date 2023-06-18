import { FC, lazy } from 'react'
import { ILoginFormProps } from './LoginForm'

// Сделали динамическим, чтобы также сделать асинхронным (динамическим) загрузку слайса loginSlice - она нам нужен только для авторизации. Поэтому будем подгружать его только при открытии формы авторизации
export const LoginFormAsync = lazy<FC<ILoginFormProps>>(
    () =>
        new Promise((resolve) => {
            setTimeout(() => {
                // @ts-ignore
                resolve(import('./LoginForm'))
            }, 1500)
        }),
)
