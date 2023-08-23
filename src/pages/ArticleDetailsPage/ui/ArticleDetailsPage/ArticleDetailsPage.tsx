import { memo } from 'react'
import { useParams } from 'react-router-dom'
import { ArticleDetails } from '@/entities/Article'
import { classNames } from '@/shared/lib/classNames/classNames'
import { DynamicModuleLoader, TReducerLIst } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'
import { Page } from '@/widgets/Page/Page'
import { VStack } from '@/shared/ui/Stack'
import { ArticleRecommendationsList } from '@/features/articleRecommendationsList'
import { articleDetailsPageReducer } from '../../model/slices'
import { ArticleDetailsPageHeader } from '../ArticleDetailsPageHeader/ArticleDetailsPageHeader'
import { ArticleDetailsComment } from '../ArticleDetailsComment/ArticleDetailsComment'
import cls from './ArticleDetailsPage.module.scss'
import { ArticleRating } from '@/features/articleRating'

interface IArticleDetailsPageProps {
    className?: string
}

const asyncReducers: TReducerLIst = {
    articleDetailsPage: articleDetailsPageReducer,
}

const ArticleDetailsPage = (props: IArticleDetailsPageProps) => {
    const { className } = props
    // const { t } = useTranslation('article-details')
    const { id } = useParams<{ id: string }>()

    if (!id) {
        return null
    }

    return (
        <DynamicModuleLoader asyncReducers={asyncReducers} removeAfterUnmount={true}>
            <Page className={classNames(cls.articleDetailsPage, {}, [className])}>
                <VStack gap="16" max>
                    <ArticleDetailsPageHeader />

                    <ArticleDetails id={id} />

                    <ArticleRating articleId={id} />

                    <ArticleRecommendationsList />

                    <ArticleDetailsComment id={id} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    )
}

export default memo(ArticleDetailsPage)
