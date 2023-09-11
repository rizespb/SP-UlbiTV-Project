import { HTMLAttributeAnchorTarget, memo } from 'react'
import { EArticleView } from '../../model/consts/articleConsts'
import { IArticle } from '../../model/types/article'
import { ToggleFeatures } from '@/shared/lib/features'
import { ArticleListItemDeprecated } from './ArticleListItemDeprecated/ArticleListItemDeprecated'
import { ArticleListItemRedesigned } from './ArticleListItemRedesigned/ArticleListItemRedesigned'

export interface IArticleListItemProps {
    className?: string
    article: IArticle
    view: EArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: IArticleListItemProps) => (
    <ToggleFeatures
        feature="isAppRedesigned"
        on={<ArticleListItemRedesigned {...props} />}
        off={<ArticleListItemDeprecated {...props} />}
    />
))
