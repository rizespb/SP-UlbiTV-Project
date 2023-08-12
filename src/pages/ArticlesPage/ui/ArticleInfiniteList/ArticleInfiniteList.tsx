import { ArticleList } from 'entities/Article'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Text } from 'shared/ui/Text/Text'
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

    return <ArticleList isLoading={isLoading} view={view} articles={articles} className={className} />
})
