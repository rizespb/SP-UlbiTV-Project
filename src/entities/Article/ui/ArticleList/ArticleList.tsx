import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { List, ListRowProps, WindowScroller } from 'react-virtualized'
import { classNames } from 'shared/lib/classNames/classNames'
import { ETextSize, Text } from 'shared/ui/Text/Text'
import { PAGE_ID } from 'widgets/Page/Page'
import { EArticleView, IArticle } from '../../model/types/article'
import { ArticleListItem } from '../ArticleListItem/ArticleListItem'
import { ArticleListItemSkeleton } from '../ArticleListItem/ArticleListItemSkeleton'
import cls from './ArticleList.module.scss'

interface IArticleListProps {
    className?: string
    articles: IArticle[]
    isLoading?: boolean
    view?: EArticleView
    target?: HTMLAttributeAnchorTarget
}

const getSkeletons = (view: EArticleView) =>
    new Array(view === EArticleView.SMALL ? 9 : 3)
        .fill(0)
        .map((_item, index) => <ArticleListItemSkeleton className={cls.card} key={index} view={view} />)

export const ArticleList = memo((props: IArticleListProps) => {
    const { className, articles, isLoading, view = EArticleView.SMALL, target } = props
    const { t } = useTranslation('articles')

    const isBig = view === EArticleView.BIG

    const itemsPerRow = isBig ? 1 : 3
    const rowCount = isBig ? articles.length : Math.ceil(articles.length / itemsPerRow)

    // index - это индекс ряда
    const rowRender = ({ index, isScrolling, key, style }: ListRowProps) => {
        // Здесь мы решаем, сколько статей в ряду выводить в зависимости от вида списка (по 1 в ряд или по три плитки в ряд)
        const items = []
        const fromIndex = index * itemsPerRow
        const toIndex = Math.min(fromIndex + itemsPerRow, articles.length)

        for (let i = fromIndex; i < toIndex; i += 1) {
            items.push(
                <ArticleListItem
                    article={articles[i]}
                    view={view}
                    target={target}
                    key={`str${i}`}
                    className={cls.card}
                />,
            )
        }

        return (
            <div key={key} style={style} className={cls.row}>
                {items}
            </div>
        )
    }

    if (!isLoading && !articles.length) {
        return (
            <div className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                <Text size={ETextSize.L} title={t('Статьи не найдены')} />
            </div>
        )
    }

    return (
        <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
            {({ height, width, registerChild, onChildScroll, isScrolling, scrollTop }) => (
                <div ref={registerChild} className={classNames(cls.ArticleList, {}, [className, cls[view]])}>
                    <List
                        height={height ?? 700}
                        rowCount={rowCount}
                        // 700 и 330 подобрали на глаз, чтобы смотрелось адекватно
                        rowHeight={isBig ? 700 : 330}
                        rowRenderer={rowRender}
                        width={width ? width - 80 : 700}
                        autoHeight
                        onScroll={onChildScroll}
                        isScrolling={isScrolling}
                        scrollTop={scrollTop}
                    />
                    {isLoading && getSkeletons(view)}
                </div>
            )}
        </WindowScroller>
    )
})
