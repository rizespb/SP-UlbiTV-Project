import { classNames, TMods } from 'shared/lib/classNames/classNames'
import React, { memo, ReactNode } from 'react'
import { useTheme } from 'app/providers/ThemeProvider'
import { useModal } from 'shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import cls from './Drawer.module.scss'
import { Portal } from '../Portal/Portal'

interface DrawerProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

// Шторка-модалка для мобильных экранов
export const Drawer = memo((props: DrawerProps) => {
    const { className, children, onClose, isOpen, lazy } = props
    const { theme } = useTheme()

    const { close, isClosing, isMounted } = useModal({ animationDelay: 300, onClose, isOpen })

    const mods: TMods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    // Drawer окно всегда встроено в Виртуальный дом. С помощью CSS:
    // opacity: 0;
    // pointer-events: none;
    // z-index: -1;
    // мы полностью ее скрываем ПОД остальным сайтом. Но тогда инпут сразу присутствует в ДОМ. И при клике на кнопку Войти он не получает фокус (автофокус устанавливается при первоначальном рендере)

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.drawer, mods, [className, theme, 'app_drawer'])}>
                <Overlay onClick={close} />

                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
})
