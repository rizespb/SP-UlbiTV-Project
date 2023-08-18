import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './Overlay.module.scss'

interface IOverlayProps {
    className?: string
    onClick?: () => void
}

export const Overlay = memo((props: IOverlayProps) => {
    const { className, onClick } = props

    return <div onClick={onClick} className={classNames(cls.overlay, {}, [className])} />
})
