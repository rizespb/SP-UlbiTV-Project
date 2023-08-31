import { useTranslation } from 'react-i18next'
import { memo, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { RatingCard } from '@/entities/Rating'
import { useGetArticleRating, useRateArticle } from '../../api/articleRatingApi'
import { getUserAuthData } from '@/entities/User'
import { Skeleton } from '@/shared/ui/Skeleton'

export interface ArticleRatingProps {
    className?: string
    articleId: string
}

// Рейтинг статьи
const ArticleRating = memo((props: ArticleRatingProps) => {
    const { className, articleId } = props
    const { t } = useTranslation()
    const userData = useSelector(getUserAuthData)

    // Какой рейтинг текущий пользователь поставил статье ранее, чтобы отобразить нужное количество звезд
    // Если рейтинг undefined, значит пользователь пока не оценивал статью
    const { data, isLoading } = useGetArticleRating({
        articleId,
        userId: userData?.id ?? '',
    })

    // Отправляем установленный рейтинг на сервер
    // rateArticleMutation - функция, осуществляющая мутацию
    // второй элемент массива мог быть объект с error, isError, isLoading и пр.
    const [rateArticleMutation] = useRateArticle()

    // Отправляем фидбек на сервер
    const handleRateArticle = useCallback(
        (starsCount: number, feedback?: string) => {
            try {
                rateArticleMutation({
                    userId: userData?.id ?? '',
                    articleId,
                    rate: starsCount,
                    feedback,
                })
            } catch (e) {
                // handle error
                // eslint-disable-next-line no-console
                console.log(e)
            }
        },
        [articleId, rateArticleMutation, userData?.id],
    )

    // Отправить рейтинг с фидбеком (из модалки)
    const onAccept = useCallback(
        (starsCount: number, feedback?: string) => {
            handleRateArticle(starsCount, feedback)
        },
        [handleRateArticle],
    )

    // Отправить только рейтинг (если в открывшейся модалке пользователь отказался отправлять отзыв и нажал Закрыть)
    const onCancel = useCallback(
        (starsCount: number) => {
            handleRateArticle(starsCount)
        },
        [handleRateArticle],
    )

    if (isLoading) {
        return <Skeleton width="100%" height={120} />
    }

    // Рейтинг, который пользователь ранее поставил статье
    const rating = data?.[0]

    return (
        <RatingCard
            onCancel={onCancel}
            onAccept={onAccept}
            rate={rating?.rate}
            className={className}
            title={t('Оцените статью')}
            feedbackTitle={t(
                'Оставьте свой отзыв о статье, это поможет улучшить качество',
            )}
            hasFeedback
        />
    )
})

export default ArticleRating
