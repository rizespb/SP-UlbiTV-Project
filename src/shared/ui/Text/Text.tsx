import { memo } from 'react'
import { classNames, TMods } from 'shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export enum TextTheme {
    PRIMARY = 'primary',
    ERROR = 'error',
}

export enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export interface TextProps {
    className?: string
    title?: string
    text?: string
    theme?: TextTheme
    align?: TextAlign
}

export const Text = memo((props: TextProps) => {
    const { className, title, text, theme = TextTheme.PRIMARY, align = TextAlign.LEFT } = props

    const mods: TMods = {
        [cls[theme]]: true,
        [cls[align]]: true,
    }

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            <p className={cls.title}>{title}</p>
            <p className={cls.text}>{text}</p>
        </div>
    )
})
