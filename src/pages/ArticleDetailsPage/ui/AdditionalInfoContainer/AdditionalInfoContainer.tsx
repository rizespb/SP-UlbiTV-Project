import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card } from '@/shared/ui/redesigned/Card'
import { ArticleAdditionalInfo } from '@/widgets/ArticleAdditionalInfo'
import { getArticleDetailsData } from '@/entities/Article'
import cls from './AdditionalInfoContainer.module.scss'
import { getRouteArticleEdit } from '@/shared/const/router'

// Справа от статьи информация об авторе, кнопка редактировать, количество просмотров
export const AdditionalInfoContainer = memo(() => {
    const article = useSelector(getArticleDetailsData)

    const navigate = useNavigate()

    // При клике на кнопку Редактировать переходим на страницу редактирования
    const onEditArticle = useCallback(() => {
        if (article) {
            navigate(getRouteArticleEdit(article.id))
        }
    }, [article, navigate])

    if (!article) {
        return null
    }

    return (
        <Card padding="24" border="partialBorder" className={cls.card}>
            <ArticleAdditionalInfo
                onEdit={onEditArticle}
                author={article.user}
                createdAt={article.createdAt}
                views={article.views}
            />
        </Card>
    )
})
