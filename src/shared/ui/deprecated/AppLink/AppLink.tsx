import { ForwardedRef, forwardRef, ReactNode } from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './AppLink.module.scss'

export enum EAppLinkTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    RED = 'red',
}

interface AppLinkProps extends LinkProps {
    className?: string
    theme?: EAppLinkTheme
    children?: ReactNode
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const AppLink = forwardRef(
    (props: AppLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
        const {
            to,
            className,
            children,
            theme = EAppLinkTheme.PRIMARY,
            ...otherProps
        } = props

        return (
            <Link
                to={to}
                className={classNames(cls.AppLink, {}, [className, cls[theme]])}
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...otherProps}
                ref={ref}
            >
                {children}
            </Link>
        )
    },
)
