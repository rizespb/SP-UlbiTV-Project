import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { classNames } from 'shared/lib/classNames/classNames'
import { Page } from 'widgets/Page/Page'
import cls from './ArticleEditPage.module.scss'

interface IArticleEditPageProps {
    className?: string
}

const ArticleEditPage = memo((props: IArticleEditPageProps) => {
    const { className } = props
    const { t } = useTranslation('article-edit')
    const { id } = useParams<{ id: string }>()
    // Если в адресе есть id (articles/:id/edit), то это режим редактирования
    // Если нет - режим создания новой статьи
    const isEdit = Boolean(id)

    return (
        <Page className={classNames(cls.articleEditPage, {}, [className])}>
            {isEdit ? t('Редактирование статьи с ID = ') + id : t('Создание новой статьи')}
        </Page>
    )
})

export default ArticleEditPage
