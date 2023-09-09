import { CSSProperties, useMemo } from 'react'
import { classNames, TMods } from '../../../lib/classNames/classNames'
import { AppImage } from '../../redesigned/AppImage'
import UserIcon from '../../../assets/icons/user-filled.svg'
import cls from './Avatar.module.scss'
import { Skeleton } from '../Skeleton'
import { Icon } from '../Icon'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
    // Инвертировать цвета свг или нет
    fallbackInverted?: boolean
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Avatar = (props: AvatarProps) => {
    const { className, src, size, alt, fallbackInverted } = props

    const mods: TMods = {}

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    )

    const fallback = <Skeleton width={size} height={size} border="50%" />

    const errorFallback = (
        <Icon
            inverted={fallbackInverted}
            width={size}
            height={size}
            Svg={UserIcon}
        />
    )

    return (
        <AppImage
            fallback={fallback}
            errorFallback={errorFallback}
            src={src}
            className={classNames(cls.Avatar, mods, [className])}
            style={styles}
            alt={alt}
        />
    )
}
