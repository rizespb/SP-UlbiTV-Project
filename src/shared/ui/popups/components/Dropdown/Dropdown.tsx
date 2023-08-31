import { Menu } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TDropdownDirection } from '@/shared/types/ui'
import { AppLink } from '../../../AppLink/AppLink'
import { mapDirectionClass } from '../../styles/consts'
import cls from './Dropdown.module.scss'
import popupCls from '../../styles/popup.module.scss'

export interface IDropdownItem {
    disabled?: boolean
    content?: ReactNode
    onClick?: () => void
    href?: string
}

interface IDropdownProps {
    className?: string
    items: IDropdownItem[]
    direction?: TDropdownDirection
    trigger: ReactNode
}

// Выпадающее меню со списком ссылок или кнопок
export function Dropdown(props: IDropdownProps) {
    const { className, trigger, items, direction = 'bottom right' } = props

    const menuClasses = [mapDirectionClass[direction]]

    return (
        <Menu
            as="div"
            className={classNames(cls.dropdown, {}, [
                className,
                popupCls.popup,
            ])}
        >
            <Menu.Button className={popupCls.trigger}>{trigger}</Menu.Button>
            <Menu.Items className={classNames(cls.menu, {}, menuClasses)}>
                {items.map((item, index) => {
                    const content = ({ active }: { active: boolean }) => (
                        <button
                            type="button"
                            disabled={item.disabled}
                            onClick={item.onClick}
                            className={classNames(cls.item, {
                                [popupCls.active]: active,
                            })}
                        >
                            {item.content}
                        </button>
                    )

                    if (item.href) {
                        return (
                            <Menu.Item
                                as={AppLink}
                                to={item.href}
                                disabled={item.disabled}
                                key={`dropdown-key-${index}`}
                            >
                                {content}
                            </Menu.Item>
                        )
                    }

                    return (
                        <Menu.Item
                            as={Fragment}
                            disabled={item.disabled}
                            key={`dropdown-key-${index}`}
                        >
                            {content}
                        </Menu.Item>
                    )
                })}
            </Menu.Items>
        </Menu>
    )
}
