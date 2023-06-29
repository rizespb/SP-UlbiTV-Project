import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'shared/ui/Select/Select'
import { ECurrency } from '../../model/types/currency'

interface ICurrencySelectProps {
    className: string
    value?: ECurrency
    onChange?: (value: ECurrency) => void
    readOnly?: boolean
}

const options = [
    {
        value: ECurrency.RUB,
        content: ECurrency.RUB,
    },
    {
        value: ECurrency.EUR,
        content: ECurrency.EUR,
    },
    {
        value: ECurrency.USD,
        content: ECurrency.USD,
    },
]

export const CurrencySelect = memo((props: ICurrencySelectProps) => {
    const { value, onChange, readOnly, className } = props
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as ECurrency)
        },
        [onChange],
    )

    return (
        <Select
            className={className}
            label={t('Укажите валюту')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readOnly={readOnly}
        />
    )
})