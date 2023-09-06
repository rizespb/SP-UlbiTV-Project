import { useTranslation } from 'react-i18next'
import { memo, useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import { Modal } from '@/shared/ui/Modal'
import { Text } from '@/shared/ui/Text'
import { saveJsonSettings, useJsonSettings } from '@/entities/User'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { Drawer } from '@/shared/ui/Drawer'

// Приветственная модалка, которая открывается один раз при первом заходе пользователя в приложение
export const ArticlePageGreeting = memo(() => {
    const { t } = useTranslation('articles')
    const [isOpen, setIsOpen] = useState(false)
    const { isArticlesPageWasOpened } = useJsonSettings()
    const dispatch = useAppDispatch()

    useEffect(() => {
        // Если окно ранее не открывалось,то открываем его и сохраняем настройки на сервере
        if (!isArticlesPageWasOpened) {
            setIsOpen(true)
            dispatch(saveJsonSettings({ isArticlesPageWasOpened: true }))
        }
    }, [dispatch, isArticlesPageWasOpened])

    // Закрытие модалки
    const onClose = () => setIsOpen(false)

    const text = (
        <Text
            title={t('Добро пожаловать на страницу статей')}
            text={t(
                'Здесь вы можете искать и просматривать статьи на различные темы',
            )}
        />
    )

    if (isMobile) {
        return (
            <Drawer lazy isOpen={isOpen} onClose={onClose}>
                {text}
            </Drawer>
        )
    }

    return (
        <Modal lazy isOpen={isOpen} onClose={onClose}>
            {text}
        </Modal>
    )
})
