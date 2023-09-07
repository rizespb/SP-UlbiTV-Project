import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Loader.module.scss'

interface LoaderProps {
    type?: 'ring' | 'ellipsis'
    className?: string
}

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const Loader = ({ type = 'ring', className }: LoaderProps) => (
    <div className={classNames(cls[`loader-${type}`], {}, [className])}>
        <div />
        <div />
        <div />
        <div />
    </div>
)
