import { memo, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ITabItem, Tabs as TabsDeprecated } from '@/shared/ui/deprecated/Tabs'
import { EArticleType } from '@/entities/Article'
import { ToggleFeatures } from '@/shared/lib/features'
import { Tabs } from '@/shared/ui/redesigned/Tabs'

interface IArticleTypeTabsProps {
    className?: string
    value: EArticleType
    onChangeType: (type: EArticleType) => void
}

export const ArticleTypeTabs = memo((props: IArticleTypeTabsProps) => {
    const { className, value, onChangeType } = props
    const { t } = useTranslation('articles')

    const typeTabs = useMemo<ITabItem[]>(
        () => [
            {
                value: EArticleType.ALL,
                content: t('Все статьи'),
            },
            {
                value: EArticleType.IT,
                content: t('Айти'),
            },
            {
                value: EArticleType.ECONOMICS,
                content: t('Экономика'),
            },
            {
                value: EArticleType.SCIENCE,
                content: t('Наука'),
            },
        ],
        [t],
    )

    const onTabClick = useCallback(
        (tab: ITabItem) => {
            onChangeType(tab.value as EArticleType)
        },
        [onChangeType],
    )

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Tabs
                    direction="column"
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
            off={
                <TabsDeprecated
                    tabs={typeTabs}
                    value={value}
                    onTabClick={onTabClick}
                    className={classNames('', {}, [className])}
                />
            }
        />
    )
})
