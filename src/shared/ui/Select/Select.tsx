import { ChangeEvent, memo, useMemo } from 'react'
import { classNames, TMods } from 'shared/lib/classNames/classNames'
import cls from './Select.module.scss'

export interface ISelectOption {
    value: string
    content: string
}

interface SelectProps {
    className?: string
    label?: string
    options?: ISelectOption[]
    value?: string
    onChange?: (value: string) => void
    readOnly?: boolean
}

export const Select = memo((props: SelectProps) => {
    const { className, label, options, value, onChange, readOnly } = props

    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        if (onChange) {
            onChange(e.target.value)
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
})
