import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Text.module.scss'

export type TTextVariant = 'primary' | 'error' | 'accent'

export type TTextAlign = 'right' | 'left' | 'center'

export type TTextSize = 's' | 'm' | 'l'

interface TextProps {
    className?: string
    title?: string
    text?: string
    variant?: TTextVariant
    align?: TTextAlign
    size?: TTextSize
    bold?: boolean

    'data-testid'?: string
}

type THeaderTagType = 'h1' | 'h2' | 'h3'

const mapSizeToClass: Record<TTextSize, string> = {
    s: 'size_s',
    m: 'size_m',
    l: 'size_l',
}

const mapSizeToHeaderTag: Record<TTextSize, THeaderTagType> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
}

export const Text = memo((props: TextProps) => {
    const {
        className,
        text,
        title,
        variant = 'primary',
        align = 'left',
        size = 'm',
        bold,
        'data-testid': dataTestId = 'Text',
    } = props

    const HeaderTag = mapSizeToHeaderTag[size]
    const sizeClass = mapSizeToClass[size]

    const additionalClasses = [className, cls[variant], cls[align], sizeClass]

    return (
        <div
            className={classNames(
                cls.Text,
                { [cls.bold]: bold },
                additionalClasses,
            )}
        >
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
