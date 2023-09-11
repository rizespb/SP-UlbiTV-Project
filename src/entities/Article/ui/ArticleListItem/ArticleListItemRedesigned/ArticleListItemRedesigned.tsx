import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { IArticleListItemProps } from '../ArticleListItem'
import { Text } from '@/shared/ui/redesigned/Text'
import { Icon } from '@/shared/ui/redesigned/Icon'
import EyeIcon from '@/shared/assets/icons/eye.svg'
import { IArticleTextBlock } from '../../../model/types/article'
import { Card } from '@/shared/ui/redesigned/Card'
import { Avatar } from '@/shared/ui/redesigned/Avatar'
import { AppImage } from '@/shared/ui/redesigned/AppImage'
import { Skeleton } from '@/shared/ui/redesigned/Skeleton'
import { AppLink } from '@/shared/ui/redesigned/AppLink'
import { getRouteArticleDetails } from '@/shared/const/router'
import { Button } from '@/shared/ui/redesigned/Button'
import { HStack, VStack } from '@/shared/ui/redesigned/Stack'
import {
    EArticleBlockType,
    EArticleView,
} from '../../../model/consts/articleConsts'
import cls from './ArticleListItemRedesigned.module.scss'

export const ArticleListItemRedesigned = memo(
    (props: IArticleListItemProps) => {
        const { className, article, view, target } = props
        const { t } = useTranslation('articles')

        const userInfo = (
            <>
                <Avatar size={32} src={article.user.avatar} />
                <Text bold text={article.user.username} />
            </>
        )

        const views = (
            <HStack gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article.views)} className={cls.views} />
            </HStack>
        )

        if (view === EArticleView.BIG) {
            const textBlock = article.blocks.find(
                (block) => block.type === EArticleBlockType.TEXT,
            ) as IArticleTextBlock

            return (
                <Card
                    padding="24"
                    max
                    data-testid="ArticleListItem"
                    className={classNames(cls.ArticleListItem, {}, [
                        className,
                        cls[view],
                    ])}
                >
                    <VStack max gap="16">
                        <HStack gap="8" max>
                            <Avatar size={32} src={article.user.avatar} />
                            <Text bold text={article.user.username} />
                            <Text text={article.createdAt} />
                        </HStack>

                        <Text title={article.title} bold />
                        <Text title={article.subtitle} size="s" />

                        <AppImage
                            fallback={<Skeleton width="100%" height={250} />}
                            src={article.img}
                            className={cls.img}
                            alt={article.title}
                        />

                        {textBlock?.paragraphs && (
                            // Обрезаем до двух параграфов
                            <Text
                                className={cls.textBlock}
                                text={textBlock.paragraphs
                                    .slice(0, 2)
                                    .join(' ')}
                            />
                        )}

                        <HStack max justify="between">
                            <AppLink
                                target={target}
                                to={getRouteArticleDetails(article.id)}
                            >
                                <Button variant="outline">
                                    {t('Читать далее')}
                                </Button>
                            </AppLink>
                            {views}
                        </HStack>
                    </VStack>
                </Card>
            )
        }

        return (
            <AppLink
                data-testid="ArticleListItem"
                target={target}
                to={getRouteArticleDetails(article.id)}
                className={classNames(cls.ArticleListItem, {}, [
                    className,
                    cls[view],
                ])}
            >
                <Card className={cls.card} border="roundBorder">
                    <AppImage
                        fallback={<Skeleton width={200} height={200} />}
                        alt={article.title}
                        src={article.img}
                        className={cls.img}
                    />

                    <VStack className={cls.info} gap="4">
                        <Text title={article.title} className={cls.title} />

                        <VStack gap="4" className={cls.footer} max>
                            <HStack justify="between" max>
                                <Text
                                    text={article.createdAt}
                                    className={cls.date}
                                />

                                {views}
                            </HStack>

                            <HStack gap="4">{userInfo}</HStack>
                        </VStack>
                    </VStack>
                </Card>
            </AppLink>
        )
    },
)
