import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ETextSize, Text } from '@/shared/ui/deprecated/Text'
import { IArticle } from '../../model/types/article'
import { EArticleView } from '../../model/consts/articleConsts'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { HStack } from '@/shared/ui/redesigned/Stack'

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
        .map((_item, index) => (
            <ArticleListItemSkeleton
                className={cls.card}
                key={index}
                view={view}
            />
        ))

export const ArticleList = memo((props: IArticleListProps) => {
    const {
        className,
        articles,
        isLoading,
        view = EArticleView.SMALL,
        target,
    } = props
    const { t } = useTranslation('articles')

    if (!isLoading && !articles.length) {
        return (
            <div
                className={classNames(cls.ArticleList, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Text size={ETextSize.L} title={t('Статьи не найдены')} />
            </div>
        )
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <HStack
                    wrap="wrap"
                    gap="16"
                    className={classNames(cls.ArticleListRedesigned, {}, [])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}
                    {isLoading && getSkeletons(view)}
                </HStack>
            }
            off={
                <div
                    className={classNames(cls.ArticleList, {}, [
                        className,
                        cls[view],
                    ])}
                    data-testid="ArticleList"
                >
                    {articles.map((item) => (
                        <ArticleListItem
                            article={item}
                            view={view}
                            target={target}
                            key={item.id}
                            className={cls.card}
                        />
                    ))}

                    {isLoading && getSkeletons(view)}
                </div>
            }
        />
    )
})
