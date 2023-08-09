import { Fragment, ReactNode } from 'react'
import { Listbox as HListBox } from '@headlessui/react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ListBox.module.scss'
import { Button } from '../Button'
import { HStack } from '../Stack'

export interface IListBoxItem {
    value: string
    content: ReactNode
    disabled?: boolean
}

type TDropdownDirection = 'top' | 'bottom'

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

const mapDirectionClass: Record<TDropdownDirection, string> = {
    bottom: cls.optionsBottom,
    top: cls.optionsTop,
}

export const ListBox = (props: IListBoxProps) => {
    const { className, items, value, defaultValue, onChange, readonly, direction = 'bottom', label } = props

    const checkmark = ' ✔'

    const optionsClasses = [mapDirectionClass[direction]]

    return (
        <HStack gap="4">
            {label && <span>{`${label}>`}</span>}

            <HListBox
                as="div"
                className={classNames(cls.listBox, {}, [className])}
                value={value}
                onChange={onChange}
                disabled={readonly}
            >
                <HListBox.Button className={cls.trigger} disabled={readonly}>
                    <Button disabled={readonly}>{value ?? defaultValue}</Button>
                </HListBox.Button>

                <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
                    {items?.map((item) => (
                        <HListBox.Option key={item.value} value={item.value} disabled={item.disabled} as={Fragment}>
                            {({ active, selected }) => (
                                <li
                                    className={classNames(cls.item, {
                                        [cls.active]: active,
                                        [cls.disabled]: item.disabled,
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
