import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ETextSize, Text } from '@/shared/ui/Text/Text'
import { PAGE_ID } from '@/widgets/Page/Page'
import { IArticle } from '../../model/types/article'
import { EArticleView } from '../../model/consts/articleConsts'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface IArticleListProps {
    className?: string
    articles: IArticle[]
    isLoading?: boolean
    // Открывать ссылки в новой вкладке или в текущей
    target?: HTMLAttributeAnchorTarget
    view?: EArticleView
}

const getSkeletons = (view: EArticleView) =>
    new Array(view === EArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList = memo((props: IArticleListProps) => {
    const { className, articles, isLoading, view = EArticleView.SMALL, target } = props
    const { t } = useTranslation('articles')

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={ETextSize.L} title={t('Статьи не найдены')} />
            </div>
        )
    }

    return (
        <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
            {articles.map((item) => (
                <ArticleListItem article={item} view={view} target={target} key={item.id} className={cls.card} />
            ))}

            {isLoading && getSkeletons(view)}
        </div>
    )
})
