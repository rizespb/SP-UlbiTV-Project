import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from 'shared/ui/Button'

// Компонент для тестирования
export const BugButton = () => {
    const [isError, setIsError] = useState(false)

    const { t } = useTranslation()

    const onThrow = () => setIsError(true)

    useEffect(() => {
        if (isError) {
            throw new Error()
        }
    }, [isError])

    return <Button onClick={onThrow}>{t('Throw error')}</Button>
}
