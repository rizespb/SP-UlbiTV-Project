import { classNames, TMods } from 'shared/lib/classNames/classNames'
import React, { memo, ReactNode } from 'react'
import { useTheme } from 'app/providers/ThemeProvider'
import { Overlay } from '../Overlay/Overlay'
import cls from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
}

// Шторка-модалка для мобильных экранов
export const Drawer = memo((props: DrawerProps) => {
    const { className, children, onClose, isOpen } = props
    const { theme } = useTheme()

    const mods: TMods = {
        [cls.opened]: isOpen,
    }

    return (
        <Portal>
            <div className={classNames(cls.drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={onClose} />

                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
})
