import { HTMLAttributes, memo, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Card.module.scss'

export enum ECardTheme {
    NORMAL = 'normal',
    OUTLINED = 'outlined',
}

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
    className?: string
    children: ReactNode
    theme?: ECardTheme
    max?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Card = memo((props: ICardProps) => {
    const {
        className,
        children,
        theme = ECardTheme.NORMAL,
        max,
        ...otherProps
    } = props

    return (
        <div
            className={classNames(cls.card, { [cls.max]: max }, [
                className,
                cls[theme],
            ])}
            {...otherProps}
        >
            {children}
        </div>
    )
})
