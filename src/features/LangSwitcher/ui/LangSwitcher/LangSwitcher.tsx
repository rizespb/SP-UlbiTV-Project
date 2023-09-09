import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/depricated/Button'
import { ToggleFeatures } from '@/shared/lib/features'
import { Button } from '@/shared/ui/redesigned/Button'

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation()

    const toggle = async () => {
        i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Button variant="clear" onClick={toggle}>
                    {t(
                        short
                            ? 'Короткий лейбл для Переключателя языка'
                            : 'Язык',
                    )}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    theme={EButtonTheme.CLEAR}
                    onClick={toggle}
                >
                    {t(
                        short
                            ? 'Короткий лейбл для Переключателя языка'
                            : 'Язык',
                    )}
                </ButtonDeprecated>
            }
        />
    )
})
