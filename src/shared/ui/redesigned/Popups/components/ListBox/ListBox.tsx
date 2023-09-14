import { Fragment, ReactNode, useMemo } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TDropdownDirection } from '@/shared/types/ui'
import { HStack } from '../../../../redesigned/Stack'
import { Button } from '../../../Button/Button'
import cls from './ListBox.module.scss'
import { mapDirectionClass } from '../../styles/consts'
import popupCls from '../../styles/popup.module.scss'
import ArrowIcon from '@/shared/assets/icons/arrow-bottom.svg'
import { Icon } from '../../../Icon'

export interface ListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

interface IListBoxProps<T extends string> {
    items?: ListBoxItem[]
    className?: string
    value?: T
    // Какое значение выбирать, если пока ничего не выбрано
    defaultValue?: string
    onChange: (value: T) => void
    readonly?: boolean
    direction?: TDropdownDirection
    label?: string
}

// Выпадающий список для для выбора одной опции - кастомный Select (например, список валют или стран в карточке профиля )
export function ListBox<T extends string>(props: IListBoxProps<T>) {
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

    const optionsClasses = [mapDirectionClass[direction], popupCls.menu]

    const selectedItem = useMemo(
        () => items?.find((item) => item.value === value),
        [items, value],
    )

    const checkmark = ' ✔'

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}
            <HListBox
                disabled={readonly}
                as="div"
                className={classNames(cls.ListBox, {}, [
                    className,
                    popupCls.popup,
                ])}
                value={value}
                onChange={onChange}
            >
                <HListBox.Button
                    // Определяем компонент HListBox.Button из headlessui как нашу кнопку Button из кита и прокидываем ей пропсы для Button
                    as={Button}
                    disabled={readonly}
                    variant="filled"
                    addonRight={<Icon Svg={ArrowIcon} />}
                >
                    {selectedItem?.content ?? defaultValue}
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
                                        [popupCls.selected]: selected,
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
