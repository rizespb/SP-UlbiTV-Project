import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { ArticleList } from '@/entities/Article'
import { Text } from '@/shared/ui/depricated/Text'
import { getArticles } from '../../model/slices/articlesPageSlice'
import {
    getArticlesPageError,
    getArticlesPageIsLoading,
    getArticlesPageView,
} from '../../model/selectors/articlesPageSelectors'

interface IArticleInfiniteListProps {
    className?: string
}

export const ArticleInfiniteList = memo((props: IArticleInfiniteListProps) => {
    const { className } = props
    const { t } = useTranslation('articles')

    const articles = useSelector(getArticles.selectAll)
    const isLoading = useSelector(getArticlesPageIsLoading)
    const view = useSelector(getArticlesPageView)
    const error = useSelector(getArticlesPageError)

    if (error) {
        return <Text text={t('Ошибка при загрузке статей')} />
    }

    return (
        <ArticleList
            isLoading={isLoading}
            view={view}
            articles={articles}
            className={className}
        />
    )
})
