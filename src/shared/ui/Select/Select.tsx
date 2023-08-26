import { ChangeEvent, useMemo } from 'react'
import { classNames, TMods } from '@/shared/lib/classNames/classNames'
import cls from './Select.module.scss'

// В 100 уроке переделывали Select на дженерик. У меня это было сделано ранее, поэтому никаких изменений не вносил
export interface ISelectOption<T extends string> {
    value: T
    content: string
}

interface SelectProps<T extends string> {
    className?: string
    label?: string
    options?: ISelectOption<T>[]
    value?: T
    onChange?: (value: T) => void
    readOnly?: boolean
}

export const Select = <T extends string>(props: SelectProps<T>) => {
    const { className, label, options, value, onChange, readOnly } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value as T)
        }
    }

    const optionList = useMemo(
        () =>
            options?.map((opt) => (
                <option className={cls.option} value={opt.value} key={opt.value}>
                    {opt.content}
                </option>
            )),
        [options],
    )

    const mods: TMods = {}

    return (
        <div className={classNames(cls.wrapper, mods, [className])}>
            {label && <span className={cls.label}>{`${label}>`}</span>}

            <select className={cls.select} value={value} onChange={onChangeHandler} disabled={readOnly}>
                {optionList}
            </select>
        </div>
    )
}
