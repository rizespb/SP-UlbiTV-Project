import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ArticleList } from '@/entities/Article'
import { ETextSize, Text } from '@/shared/ui/depricated/Text'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi'

interface IArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo(
    (props: IArticleRecommendationsListProps) => {
        const { className } = props
        const { t } = useTranslation()

        // Передаем limit в useArticleRecommendationsList
        const {
            isLoading,
            data: articles,
            error,
        } = useArticleRecommendationsList(3)

        if (isLoading || error || !articles) {
            return null
        }

        return (
            <VStack
                data-testid="ArticleRecommendationsList"
                gap="8"
                className={classNames('', {}, [className])}
            >
                <Text size={ETextSize.L} title={t('Рекомендуем')} />

                <ArticleList articles={articles} target="_blank" />
            </VStack>
        )
    },
)
