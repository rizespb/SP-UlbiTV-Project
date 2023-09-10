import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from '@/shared/lib/classNames/classNames'
import { TSortOrder } from '@/shared/types/sort'
import { ISelectOption, Select } from '@/shared/ui/depricated/Select'
import cls from './ArticleSortSelector.module.scss'
import { EArticleSortField } from '@/entities/Article'
import { ToggleFeatures } from '@/shared/lib/features'
import { VStack } from '@/shared/ui/redesigned/Stack'
import { Text } from '@/shared/ui/redesigned/Text'
import { ListBox } from '@/shared/ui/redesigned/Popups'

interface IArticleSortSelectorProps {
    className?: string
    sort: EArticleSortField
    order: TSortOrder
    onChangeOrder: (newOrder: TSortOrder) => void
    onChangeSort: (newSort: EArticleSortField) => void
}

export const ArticleSortSelector = memo((props: IArticleSortSelectorProps) => {
    const { className, sort, order, onChangeOrder, onChangeSort } = props
    const { t } = useTranslation()

    const orderOptions = useMemo<ISelectOption<TSortOrder>[]>(
        () => [
            {
                value: 'asc',
                content: t('возрастанию'),
            },
            {
                value: 'desc',
                content: t('убыванию'),
            },
        ],
        [t],
    )

    const sortFieldOptions = useMemo<ISelectOption<EArticleSortField>[]>(
        () => [
            {
                value: EArticleSortField.CREATED,
                content: t('дате создания'),
            },
            {
                value: EArticleSortField.TITLE,
                content: t('названию'),
            },
            {
                value: EArticleSortField.VIEWS,
                content: t('просмотрам'),
            },
        ],
        [t],
    )

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div
                    className={classNames(
                        cls.articleSortSelectorRedesigned,
                        {},
                        [className],
                    )}
                >
                    <VStack gap="8">
                        <Text text={t('Сортировать по')} />

                        <ListBox
                            items={sortFieldOptions}
                            value={sort}
                            onChange={onChangeSort}
                        />

                        <ListBox
                            items={orderOptions}
                            value={order}
                            onChange={onChangeOrder}
                        />
                    </VStack>
                </div>
            }
            off={
                <div
                    className={classNames(cls.articleSortSelector, {}, [
                        className,
                    ])}
                >
                    {/* указывать дженерик <EArticleSortField> в данном случае необязательно – сделано для примера, как можно ЯВНО указывать тип */}
                    <Select<EArticleSortField>
                        options={sortFieldOptions}
                        label={t('Сортировать по')}
                        value={sort}
                        onChange={onChangeSort}
                    />

                    {/* указывать дженерик <TSortOrder> в данном случае необязательно – сделано для примера, как можно ЯВНО указывать тип */}
                    <Select<TSortOrder>
                        options={orderOptions}
                        label={t('по')}
                        value={order}
                        onChange={onChangeOrder}
                        className={cls.order}
                    />
                </div>
            }
        />
    )
})
