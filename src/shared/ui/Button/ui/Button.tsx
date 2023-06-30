import { ButtonHTMLAttributes, memo, ReactNode } from 'react'
import { classNames, TMods } from 'shared/lib/classNames/classNames'
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
    theme?: EButtonTheme
    square?: boolean
    size?: EButtonSize
    disabled?: boolean
    children?: ReactNode
}

export const Button = memo((props: IButtonProps) => {
    const {
        className,
        children,
        theme = EButtonTheme.OUTLINE,
        square,
        size = EButtonSize.M,
        disabled,
        ...otherProps
    } = props

    const mods: TMods = {
        [cls.square]: square,
        [cls.disabled]: disabled,
    }

    return (
        <button
            type="button"
            className={classNames(cls.Button, mods, [className, cls[theme], cls[size]])}
            disabled={disabled}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...otherProps}
        >
            {children}
        </button>
    )
})
