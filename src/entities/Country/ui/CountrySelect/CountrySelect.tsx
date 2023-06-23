import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'shared/ui/Select/Select'
import { ECountry } from '../../model/types/country'

interface ICountrySelectProps {
    className: string
    value?: ECountry
    onChange?: (value: ECountry) => void
    readOnly?: boolean
}

const options = [
    {
        value: ECountry.Armenia,
        content: ECountry.Armenia,
    },
    {
        value: ECountry.Belarus,
        content: ECountry.Belarus,
    },
    {
        value: ECountry.Kazakhstan,
        content: ECountry.Kazakhstan,
    },
    {
        value: ECountry.Russia,
        content: ECountry.Russia,
    },
    {
        value: ECountry.China,
        content: ECountry.China,
    },
]

export const CountrySelect = memo((props: ICountrySelectProps) => {
    const { value, onChange, readOnly, className } = props
    const { t } = useTranslation()

    const onChangeHandler = useCallback(
        (value: string) => {
            onChange?.(value as ECountry)
        },
        [onChange],
    )

    return (
        <Select
            className={className}
            label={t('Укажите страну')}
            options={options}
            value={value}
            onChange={onChangeHandler}
            readOnly={readOnly}
        />
    )
})
