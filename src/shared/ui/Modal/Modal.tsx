import { ReactNode } from 'react'
import { classNames, TMods } from '@/shared/lib/classNames/classNames'
import { useModal } from '@/shared/lib/hooks/useModal/useModal'
import { Overlay } from '../Overlay/Overlay'
import { Portal } from '../Portal/Portal'
import cls from './Modal.module.scss'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'

interface ModalProps {
    className?: string
    children: ReactNode
    isOpen?: boolean
    onClose?: () => void
    lazy?: boolean
}

const ANIMATION_DELAY = 300

export const Modal = (props: ModalProps) => {
    const { className, children, isOpen, onClose, lazy } = props

    const { close, isClosing, isMounted } = useModal({ animationDelay: ANIMATION_DELAY, onClose, isOpen })

    const { theme } = useTheme()

    const mods: TMods = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing,
    }

    // МОдальное окно всегда встроено в Виртуальный дом. С помощью CSS:
    // opacity: 0;
    // pointer-events: none;
    // z-index: -1;
    // мы полностью ее скрываем ПОД остальным сайтом. Но тогда инпут сразу присутствует в ДОМ. И при клике на кнопку Войти он не получает фокус (автофокус устанавливается при первоначальном рендере)

    if (lazy && !isMounted) {
        return null
    }

    return (
        <Portal>
            <div className={classNames(cls.modal, mods, [className, theme, 'app_modal'])}>
                <Overlay onClick={close} />

                <div className={cls.content}>{children}</div>
            </div>
        </Portal>
    )
}
