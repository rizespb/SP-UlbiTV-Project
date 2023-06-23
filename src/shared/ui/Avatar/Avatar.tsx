import { CSSProperties, useMemo } from 'react'
import { classNames, TMods } from '../../lib/classNames/classNames'
import cls from './Avatar.module.scss'

interface AvatarProps {
    className?: string
    src?: string
    size?: number
    alt?: string
}

export const Avatar = (props: AvatarProps) => {
    const { className, src, size, alt } = props

    const mods: TMods = {}

    const styles = useMemo<CSSProperties>(
        () => ({
            width: size || 100,
            height: size || 100,
        }),
        [size],
    )

    return <img src={src} className={classNames(cls.Avatar, mods, [className])} style={styles} alt={alt} />
}
