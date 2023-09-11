import { memo } from 'react'
import { classNames, TMods } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export enum ETextTheme {
    PRIMARY = 'primary',
    INVERTED = 'inverted',
    ERROR = 'error',
}

export enum ETextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center',
}

export enum ETextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

export interface ITextProps {
    className?: string
    title?: string
    text?: string
    theme?: ETextTheme
    align?: ETextAlign
    size?: ETextSize

    'data-testid'?: string
}

type THeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToHeaderTag: Record<ETextSize, THeaderTagType> = {
    [ETextSize.S]: 'h3',
    [ETextSize.M]: 'h2',
    [ETextSize.L]: 'h1',
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Text = memo((props: ITextProps) => {
    const {
        className,
        title,
        text,
        theme = ETextTheme.PRIMARY,
        align = ETextAlign.LEFT,
        size = ETextSize.M,
        'data-testid': dataTestId = 'Text',
    } = props
    const HeaderTag = mapSizeToHeaderTag[size]

    const mods: TMods = {
        [cls[theme]]: true,
        [cls[align]]: true,
        [cls[size]]: true,
    }

    return (
        <div className={classNames(cls.Text, mods, [className])}>
            {title && (
                <HeaderTag
                    className={cls.title}
                    data-testid={`${dataTestId}.Header`}
                >
                    {title}
                </HeaderTag>
            )}

            {text && (
                <p className={cls.text} data-testid={`${dataTestId}.Paragraph`}>
                    {text}
                </p>
            )}
        </div>
    )
})
