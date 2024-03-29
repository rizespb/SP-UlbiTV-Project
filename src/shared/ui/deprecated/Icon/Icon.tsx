import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Icon.module.scss'

interface IIconProps extends React.SVGProps<SVGElement> {
    className?: string
    Svg: React.VFC<React.SVGProps<SVGElement>>
    inverted?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Icon = memo((props: IIconProps) => {
    const { className, Svg, inverted, ...otherProps } = props

    return (
        <Svg
            className={classNames(inverted ? cls.inverted : cls.icon, {}, [
                className,
            ])}
            {...otherProps}
        />
    )
})
