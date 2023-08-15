import { memo, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import { TSortOrder } from 'shared/types'
import { ISelectOption, Select } from 'shared/ui/Select/Select'
import { EArticleSortField } from '../../model/consts/articleConsts'
import cls from './ArticleSortSelector.module.scss'

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
        <div className={classNames(cls.articleSortSelector, {}, [className])}>
            {/* указывать дженерик <EArticleSortField> в данном случае необязательно – сделано для примера, как можно ЯВНО указывать тип */}
            <Select<EArticleSortField>
                options={sortFieldOptions}
                label={t('Сортировать по')}
                value={sort}
                onChange={onChangeSort}
            />

            {/* указывать дженерик <EArticleSortField> в данном случае необязательно – сделано для примера, как можно ЯВНО указывать тип */}
            <Select<TSortOrder>
                options={orderOptions}
                label={t('по')}
                onChange={onChangeOrder}
                value={order}
                className={cls.order}
            />
        </div>
    )
})
