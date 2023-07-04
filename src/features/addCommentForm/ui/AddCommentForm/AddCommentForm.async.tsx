import { FC, lazy } from 'react'
import { IAddCommentFormProps } from './AddCommentForm'

// Сделали динамическим, чтобы также сделать асинхронным (динамическим) загрузку слайса addCommentFormSlice - она нам нужен только для авторизации. Поэтому будем подгружать его только при открытии формы авторизации
export const AddCommentFormAsync = lazy<FC<IAddCommentFormProps>>(
    () =>
        new Promise((resolve) => {
            setTimeout(() => {
                // @ts-ignore
                resolve(import('./AddCommentForm'))
            }, 1500)
        }),
)
