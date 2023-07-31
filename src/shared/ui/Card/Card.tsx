import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum ECardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    theme?: ECardTheme
}

export const Card = memo((props: ICardProps) => {
    const { className, children, theme = ECardTheme.NORMAL, ...otherProps } = props

    return (
        <div className={classNames(cls.card, {}, [className, cls[theme]])} {...otherProps}>
            {children}
        </div>
    )
})
