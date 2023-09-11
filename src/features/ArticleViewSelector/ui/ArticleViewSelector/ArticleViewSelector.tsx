import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import ListIconDeprecated from '@/shared/assets/icons/list-24-24.svg'
import TiledIconDeprecated from '@/shared/assets/icons/tiled-24-24.svg'

import ListIcon from '@/shared/assets/icons/burger.svg'
import TiledIcon from '@/shared/assets/icons/tile.svg'

import {
    Button as ButtonDeprecated,
    EButtonTheme,
} from '@/shared/ui/deprecated/Button'
import { Icon as IconDeprecated } from '@/shared/ui/deprecated/Icon'
import cls from './ArticleViewSelector.module.scss'
import { EArticleView } from '@/entities/Article'
import { ToggleFeatures, toggleFeatures } from '@/shared/lib/features'
import { Card } from '@/shared/ui/redesigned/Card'
import { HStack } from '@/shared/ui/redesigned/Stack'
import { Icon } from '@/shared/ui/redesigned/Icon'

interface IArticleViewSelectorProps {
    className?: string
    view: EArticleView
    onViewClick?: (view: EArticleView) => void
}

const viewTypes = [
    {
        view: EArticleView.SMALL,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => TiledIcon,
            off: () => TiledIconDeprecated,
        }),
    },
    {
        view: EArticleView.BIG,
        icon: toggleFeatures({
            name: 'isAppRedesigned',
            on: () => ListIcon,
            off: () => ListIconDeprecated,
        }),
    },
]

export const ArticleViewSelector = memo((props: IArticleViewSelectorProps) => {
    const { className, view, onViewClick } = props

    const onClick = (newView: EArticleView) => () => {
        onViewClick?.(newView)
    }

    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <Card
                    className={classNames(
                        cls.articleViewSelectorRedesigned,
                        {},
                        [className],
                    )}
                    border="roundBorder"
                >
                    <HStack gap="8">
                        {viewTypes.map((viewType) => (
                            <Icon
                                clickable
                                onClick={onClick(viewType.view)}
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                                key={viewType.view}
                            />
                        ))}
                    </HStack>
                </Card>
            }
            off={
                <div
                    className={classNames(cls.articleViewSelector, {}, [
                        className,
                    ])}
                >
                    {viewTypes.map((viewType) => (
                        <ButtonDeprecated
                            key={viewType.view}
                            theme={EButtonTheme.CLEAR}
                            onClick={onClick(viewType.view)}
                        >
                            <IconDeprecated
                                width={24}
                                height={24}
                                Svg={viewType.icon}
                                className={classNames('', {
                                    [cls.notSelected]: viewType.view !== view,
                                })}
                            />
                        </ButtonDeprecated>
                    ))}
                </div>
            }
        />

        // <div className={classNames(cls.articleViewSelector, {}, [className])}>
        //     {viewTypes.map((viewType) => (
        //         <Button
        //             theme={EButtonTheme.CLEAR}
        //             onClick={onClick(viewType.view)}
        //             key={viewType.view}
        //         >
        //             <Icon
        //                 width={24}
        //                 height={24}
        //                 Svg={viewType.icon}
        //                 className={classNames('', {
        //                     [cls.notSelected]: viewType.view !== view,
        //                 })}
        //             />
        //         </Button>
        //     ))}
        // </div>
    )
})
