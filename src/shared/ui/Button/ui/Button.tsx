import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { classNames, TMods } from '@/shared/lib/classNames/classNames'
import cls from './Button.module.scss'

export enum EButtonTheme {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGROUND = 'background',
    BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum EButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string
    /**
     * Тема кнопки. Отвечает за визуал (в рамке, без стилей, противоположный теме приложения цвет и тд)
     */
    theme?: EButtonTheme
    /**
     * Флаг, делающий кнопку квадратной
     */
    square?: boolean
    /**
     * Размер кнопки в соответствии с дизайн системой
     */
    size?: EButtonSize
    /**
     * Флаг, отвечающий за работу кнопки
     */
    disabled?: boolean
    /**
     * Содержимое кнопки
     */
    children?: ReactNode
    /**
     * Увеличивает кнопку на всю свободную ширину
     */
    fullWidth?: boolean
}

export const Button = memo((props: IButtonProps) => {
    const {
        className,
        children,
        theme = EButtonTheme.OUTLINE,
        square,
        disabled,
        fullWidth,
        size = EButtonSize.M,
        ...otherProps
    } = props

    const mods: TMods = {
        [cls[theme]]: true,
        [cls.square]: square,
        [cls[size]]: true,
        [cls.disabled]: disabled,
        [cls.fullWidth]: fullWidth,
    }

    return (
        <button type="button" className={classNames(cls.Button, mods, [className])} disabled={disabled} {...otherProps}>
            {children}
        </button>
    )
})
