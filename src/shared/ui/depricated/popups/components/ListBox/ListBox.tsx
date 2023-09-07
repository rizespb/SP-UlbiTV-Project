import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TDropdownDirection } from '@/shared/types/ui'
import { Button } from '../../../Button'
import { HStack } from '../../../Stack'
import { mapDirectionClass } from '../../styles/consts'
import cls from './ListBox.module.scss'
import popupCls from '../../styles/popup.module.scss'

export interface IListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface IListBoxProps {
    items?: IListBoxItem[]
    className?: string
    value?: string
    // Какое значение выбирать, если пока ничего не выбрано
    defaultValue?: string
    onChange: (value: string) => void
    readonly?: boolean
    direction?: TDropdownDirection
    label?: string
}

// Выпадающий список для для выбора одной опции - кастомный Select (например, список валют или стран в карточке профиля )
/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const ListBox = (props: IListBoxProps) => {
    const {
        className,
        items,
        value,
        defaultValue,
        onChange,
        readonly,
        direction = 'bottom right',
        label,
    } = props

    const checkmark = ' ✔'

    const optionsClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}

            <HListBox
                as="div"
                className={classNames(cls.listBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button className={cls.trigger} disabled={readonly}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>

                <HListBox.Options
                    className={classNames(cls.options, {}, optionsClasses)}
                >
                    {items?.map((item) => (
                        <HListBox.Option
                            key={item.value}
                            value={item.value}
                            disabled={item.disabled}
                            as={Fragment}
                        >
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [popupCls.active]: active,
                                        [popupCls.disabled]: item.disabled,
                                    })}
                                >
                                    {item.content}

                                    {selected && checkmark}
                                </li>
                            )}
                        </HListBox.Option>
                    ))}
                </HListBox.Options>
            </HListBox>
        </HStack>
    )
}
