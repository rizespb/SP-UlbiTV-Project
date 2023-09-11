import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ArticleDetails } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import {
    DynamicModuleLoader,
    TReducerLIst,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComment } from '../ArticleDetailsComment/ArticleDetailsComment'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleRating } from '@/features/articleRating'
import { ToggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/deprecated/Card'

interface IArticleDetailsPageProps {
    className?: string
}

const asyncReducers: TReducerLIst = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = (props: IArticleDetailsPageProps) => {
    const { className } = props
    const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return null
    }

    return (
        <DynamicModuleLoader
            asyncReducers={asyncReducers}
            removeAfterUnmount={true}
        >
            <Page
                className={classNames(cls.articleDetailsPage, {}, [className])}
            >
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />

                    <ArticleDetails id={id} />

                    {/* Если фич-тоггле isArticleRatingEnabled в настройках пользователя jsonSettings (которые хранятся в БД на бэке) включен (true), тогда отображаем ArticleRating
                    Если выключен (false), тогда надпись 
                    'Оценка статей скоро появится!' */}
                    <ToggleFeatures
                        feature="isArticleRatingEnabled"
                        on={<ArticleRating articleId={id} />}
                        off={<Card>{t('Оценка статей скоро появится!')}</Card>}
                    />

                    <ArticleRecommendationsList />

                    <ArticleDetailsComment id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
