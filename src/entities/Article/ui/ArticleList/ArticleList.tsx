import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { EArticleView, IArticle } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface IArticleListProps {
    className?: string
    articles: IArticle[]
    isLoading?: boolean
    view?: EArticleView
}

const getSkeletons = (view: EArticleView) =>
    new Array(view === EArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList = memo((props: IArticleListProps) => {
    const { className, articles, isLoading, view = EArticleView.SMALL } = props
    const { t } = useTranslation()

    if (isLoading) {
        return <div className={classNames(cls.articleList, {}, [className, cls[view]])}>{getSkeletons(view)}</div>
    }

    const renderArticle = (article: IArticle) => (
        <ArticleListItem article={article} view={view} key={article.id} className={cls.card} />
    )

    return (
        <div className={classNames(cls.articleList, {}, [className, cls[view]])}>
            {articles.length > 0 ? articles.map(renderArticle) : null}
        </div>
    )
})
