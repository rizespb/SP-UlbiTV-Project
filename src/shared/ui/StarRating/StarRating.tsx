import { memo, useState } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import cls from './StarRating.module.scss'
import { Icon } from '@/shared/ui/Icon/Icon'
import StarIcon from '@/shared/assets/icons/star.svg'

interface StarRatingProps {
    className?: string
    onSelect?: (starsCount: number) => void
    size?: number
    selectedStars?: number
}

const stars = [1, 2, 3, 4, 5]

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
        <div className={classNames(cls.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={classNames(cls.starIcon, { [cls.selected]: isSelected }, [
                        // currentStarsCount - текущая звезда, на которую наведен курсор
                        currentStarsCount >= starNumber ? cls.hovered : cls.normal,
                    ])}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={onLeave}
                    onMouseEnter={onHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    )
})
