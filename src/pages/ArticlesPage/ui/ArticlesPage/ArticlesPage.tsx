import { ArticleList, EArticleView } from 'entities/Article'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './ArticlesPage.module.scss'

interface IArticlesPageProps {
    className?: string
}

const ArticlesPage = (props: IArticlesPageProps) => {
    const { className } = props
    const { t } = useTranslation('articles')

    // eslint-disable-next-line i18next/no-literal-string
    return (
        <div className={classNames(cls.articlesPage, {}, [className])}>
            <ArticleList isLoading={true} view={EArticleView.BIG} articles={[]} />
        </div>
    )
}

export default memo(ArticlesPage)
