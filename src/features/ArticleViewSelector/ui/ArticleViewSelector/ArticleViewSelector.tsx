import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIcon from '@/shared/assets/icons/list-24-24.svg'
import TiledIcon from '@/shared/assets/icons/tiled-24-24.svg'
import { Button, EButtonTheme } from '@/shared/ui/Button'
import { Icon } from '@/shared/ui/Icon'
import cls from './ArticleViewSelector.module.scss'
import { EArticleView } from '@/entities/Article'

interface IArticleViewSelectorProps {
    className?: string
    view: EArticleView
    onViewClick?: (view: EArticleView) => void
}

const viewTypes = [
    {
        view: EArticleView.SMALL,
        icon: TiledIcon,
    },
    {
        view: EArticleView.BIG,
        icon: ListIcon,
    },
]

export const ArticleViewSelector = memo((props: IArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const onClick = (newView: EArticleView) => () => {
        onViewClick?.(newView)
    }

    return (
        <div className={classNames(cls.articleViewSelector, {}, [className])}>
            {viewTypes.map((viewType) => (
                <Button
                    theme={EButtonTheme.CLEAR}
                    onClick={onClick(viewType.view)}
                    key={viewType.view}
                >
                    <Icon
                        width={24}
                        height={24}
                        Svg={viewType.icon}
                        className={classNames('', {
                            [cls.notSelected]: viewType.view !== view,
                        })}
                    />
                </Button>
            ))}
        </div>
    )
})
