import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { ListBox as ListBoxDeprecated } from '@/shared/ui/deprecated/popups'
import { ECurrency } from '../../model/types/currency'
import { ToggleFeatures } from '@/shared/lib/features'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface ICurrencySelectProps {
    className?: string
    value?: ECurrency
    onChange?: (value: ECurrency) => void
    readonly?: boolean
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

export const CurrencySelect = memo(
    ({ value, onChange, readonly, className }: ICurrencySelectProps) => {
        const { t } = useTranslation('profile')

        const onChangeHandler = useCallback(
            (value: string) => {
                onChange?.(value as ECurrency)
            },
            [onChange],
        )

        const props = {
            className,
            value,
            defaultValue: t('Укажите валюту'),
            label: t('Укажите валюту'),
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
