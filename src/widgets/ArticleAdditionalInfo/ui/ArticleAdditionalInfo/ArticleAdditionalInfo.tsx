import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { IUser } from '@/entities/User'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { Text } from '@/shared/ui/redesigned/Text'
import { Button } from '@/shared/ui/redesigned/Button'

interface ArticleAdditionalInfoProps {
    className?: string
    author: IUser
    createdAt: string
    views: number
    onEdit: () => void
}

export const ArticleAdditionalInfo = memo(
    (props: ArticleAdditionalInfoProps) => {
        const { className, author, createdAt, views, onEdit } = props
        const { t } = useTranslation('article-details')

        return (
            <VStack gap="32" className={classNames('', {}, [className])}>
                <HStack gap="8">
                    <Avatar src={author.avatar} size={32} />
                    <Text text={author.username} bold />
                    <Text text={createdAt} />
                </HStack>

                <Button onClick={onEdit}>{t('Редактировать')}</Button>

                {/* Плюральная форма для i118 переводов 
                Используем вот такой синтаксис с count
                А в файлы с переводами руками добавляем нужные значения 
                */}
                <Text text={t('{{count}} просмотров', { count: views })} />
            </VStack>
        )
    },
)
