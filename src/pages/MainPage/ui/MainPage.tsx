import { BugButton } from 'app/providers/ErrorBoundary'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Input } from 'shared/ui/Input/Input'

const MainPage = () => {
    const { t } = useTranslation('main')
    const [value, setValue] = useState('')

    const onChange = (val: string) => {
        setValue(val)
    }

    return (
        <div>
            <BugButton />
            {t('Главная страница')}

            {/* eslint-disable-next-line i18next/no-literal-string */}
            <Input value={value} onChange={onChange} placeholder="Введите текст" />
        </div>
    )
}

export default MainPage
