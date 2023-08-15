import { HTMLAttributeAnchorTarget, memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { Icon } from 'shared/ui/Icon/Icon'
import { Text } from 'shared/ui/Text/Text'
import EyeIcon from 'shared/assets/icons/eye-20-20.svg'
import { Card } from 'shared/ui/Card/Card'
import { Avatar } from 'shared/ui/Avatar/Avatar'
import { Button, EButtonTheme } from 'shared/ui/Button'
import { AppLink } from 'shared/ui/AppLink/AppLink'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'
import { IArticle, IArticleTextBlock } from '../../model/types/article'
import { EArticleBlockType, EArticleView } from '../../model/consts/articleConsts'
import cls from './ArticleListItem.module.scss'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

interface IArticleListItemProps {
    className?: string
    article: IArticle
    view: EArticleView
    target?: HTMLAttributeAnchorTarget
}

export const ArticleListItem = memo((props: IArticleListItemProps) => {
    const { className, article, view, target } = props
    const { t } = useTranslation('articles')

    const types = <Text text={article.type.join(', ')} className={cls.types} />

    const views = (
        <>
            <Text text={String(article.views)} className={cls.views} />
            <Icon Svg={EyeIcon} />
        </>
    )

    if (view === EArticleView.BIG) {
        const textBlock = article.blocks.find((block) => block.type === EArticleBlockType.TEXT) as IArticleTextBlock

        return (
            <div className={classNames(cls.articleListItem, {}, [className, cls[view]])}>
                <Card className={cls.card}>
                    <div className={cls.header}>
                        <Avatar size={30} src={article.user.avatar} />

                        <Text text={article.user.username} className={cls.username} />
                        <Text text={article.createdAt} className={cls.date} />
                    </div>

                    <Text title={article.title} className={cls.title} />

                    {types}

                    <img src={article.img} className={cls.img} alt={article.title} />

                    {textBlock && <ArticleTextBlockComponent block={textBlock} className={cls.textBlock} />}

                    <div className={cls.footer}>
                        <AppLink target={target} to={RoutePath.article_details + article.id}>
                            <Button theme={EButtonTheme.OUTLINE}>{t('Читать далее')}</Button>
                        </AppLink>

                        {views}
                    </div>
                </Card>
            </div>
        )
    }

    return (
        <AppLink
            target={target}
            to={RoutePath.article_details + article.id}
            className={classNames(cls.articleListItem, {}, [className, cls[view]])}
        >
            <Card className={cls.card}>
                <div className={cls.imageWrapper}>
                    <img src={article.img} className={cls.img} alt={article.title} />

                    <Text text={article.createdAt} className={cls.date} />
                </div>

                <div className={cls.infoWrapper}>
                    {types}

                    {views}
                </div>

                <Text text={article.title} className={cls.title} />
            </Card>
        </AppLink>
    )
})
