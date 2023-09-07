import { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Button, EButtonTheme } from '@/shared/ui/depricated/Button'
import { getArticleDetailsData } from '@/entities/Article'
import { HStack } from '@/shared/ui/depricated/Stack'
import { getCanEditArticle } from '../../model/selectors/article'
import { getRouteArticleEdit, getRouteArticles } from '@/shared/const/router'

interface IArticleDetailsPageHeaderProps {
    className?: string
}

export const ArticleDetailsPageHeader = memo(
    (props: IArticleDetailsPageHeaderProps) => {
        const { className } = props
        const { t } = useTranslation('article-details')
        const navigate = useNavigate()
        const article = useSelector(getArticleDetailsData)
        const canEdit = useSelector(getCanEditArticle)

        const onBackToList = useCallback(() => {
            navigate(getRouteArticles())
        }, [navigate])

        const onEditArticle = useCallback(() => {
            if (article) {
                navigate(getRouteArticleEdit(article.id))
            }
        }, [article, navigate])

        return (
            <HStack
                max
                justify="between"
                className={classNames('', {}, [className])}
            >
                <Button theme={EButtonTheme.OUTLINE} onClick={onBackToList}>
                    {t('Назад к списку')}
                </Button>

                {canEdit && (
                    <Button
                        theme={EButtonTheme.OUTLINE}
                        onClick={onEditArticle}
                    >
                        {t('Редактировать')}
                    </Button>
                )}
            </HStack>
        )
    },
)
