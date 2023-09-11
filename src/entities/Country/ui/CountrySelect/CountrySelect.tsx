import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/popups'
import { ECountry } from '../../model/types/country'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface ICountrySelectProps {
    className?: string
    value?: ECountry
    onChange?: (value: ECountry) => void
    readonly?: boolean
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

export const CountrySelect = memo(
    ({ value, onChange, readonly, className }: ICountrySelectProps) => {
        const { t } = useTranslation('profile')

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as ECountry)
            },
            [onChange],
        )

        const props = {
            className,
            value,
            defaultValue: t('Укажите страну'),
            label: t('Укажите страну'),
            items: options,
            onChange: onChangeHandler,
            readonly,
            direction: 'top right' as const,
        }

        return (
            <ToggleFeatures
                feature="isAppRedesigned"
                on={<ListBox {...props} />}
                off={<ListBoxDeprecated {...props} />}
            />
        )
    },
)
