import { Popover as HPopover } from '@headlessui/react'
import { ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TDropdownDirection } from '@/shared/types/ui'
import { mapDirectionClass } from '../../styles/consts'
import cls from './Popover.module.scss'
import popupCls from '../../styles/popup.module.scss'

interface PopoverProps {
    className?: string
    direction?: TDropdownDirection
    trigger: ReactNode
    children: ReactNode
}

// Поповер с произвольным контентом
export function Popover(props: PopoverProps) {
    const { className, trigger, direction = 'bottom right', children } = props

    const menuClasses = [mapDirectionClass[direction]]

    return (
        <HPopover className={classNames(cls.popover, {}, [className, popupCls.popup])}>
            <HPopover.Button as="div" className={popupCls.trigger}>
                {trigger}
            </HPopover.Button>

            <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>{children}</HPopover.Panel>
        </HPopover>
    )
}
