import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon as IconDeprecated } from '../Icon/Icon'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { Icon } from '../../redesigned/Icon'
import StarIcon from '@/shared/assets/icons/star.svg'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

/**
 * Устарел, используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
    const { className, size = 30, selectedStars = 0, onSelect } = props

    // Текущая звезда, над которой находится мышь (надо подкрашивать эту звезду и предыдущие)
    const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars)

    // Выбран ли уже рейтинг
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars))

    const onHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount)
        }
    }

    const onLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0)
        }
    }

    // Выбрать рейтинг можно только один раз
    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount)
            setCurrentStarsCount(starsCount)
            setIsSelected(true)
        }
    }

    return (
        <div
            className={classNames(
                toggleFeatures({
                    name: 'isAppRedesigned',
                    off: () => cls.StarRating,
                    on: () => cls.StarRatingRedesigned,
                }),
                {},
                [className],
            )}
        >
            {stars.map((starNumber) => {
                const commonProps = {
                    className: classNames(
                        cls.starIcon,
                        { [cls.selected]: isSelected },
                        [
                            // currentStarsCount - текущая звезда, на которую наведен курсор
                            currentStarsCount >= starNumber
                                ? cls.hovered
                                : cls.normal,
                        ],
                    ),
                    Svg: StarIcon,
                    key: starNumber,
                    width: size,
                    height: size,
                    onMouseLeave: onLeave,
                    onMouseEnter: onHover(starNumber),
                    onClick: onClick(starNumber),
                    'data-testid': `StarRating.${starNumber}`,
                    // Дополнительный аттрибут для тестов
                    // Проверяем в е2е, что текущая звезда закрашена (входит в текущий рейтинг)
                    ' data-selected': currentStarsCount >= starNumber,
                }

                return (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Icon clickable={!isSelected} {...commonProps} />}
                        off={<IconDeprecated {...commonProps} />}
                    />
                )
            })}
        </div>
    )
})
