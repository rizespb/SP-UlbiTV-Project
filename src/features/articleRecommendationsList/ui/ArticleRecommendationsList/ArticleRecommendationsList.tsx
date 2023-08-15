import { classNames } from 'shared/lib/classNames/classNames'
import { useTranslation } from 'react-i18next'
import { memo } from 'react'
import { ArticleList } from 'entities/Article'
import { ETextSize, Text } from 'shared/ui/Text/Text'
import { VStack } from 'shared/ui/Stack'
import { useArticleRecommendationsList } from '../../api/aritcleRecommendationsApi'

interface IArticleRecommendationsListProps {
    className?: string
}

export const ArticleRecommendationsList = memo((props: IArticleRecommendationsListProps) => {
    const { className } = props
    const { t } = useTranslation()

    // Передаем limit в useArticleRecommendationsList
    const { isLoading, data: articles, error } = useArticleRecommendationsList(3)

    if (isLoading || error || !articles) {
        return null
    }

    return (
        <VStack gap="8">
            <div className={classNames('', {}, [className])}>
                <Text size={ETextSize.L} title={t('Рекомендуем')} />

                <ArticleList articles={articles} target="_blank" virtualized={false} />
            </div>
        </VStack>
    )
})