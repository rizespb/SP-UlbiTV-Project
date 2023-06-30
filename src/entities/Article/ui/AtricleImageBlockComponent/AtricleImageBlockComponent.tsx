import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { ETextAlign, Text } from 'shared/ui/Text/Text'
import { IArticleImageBlock } from '../../model/types/article'
import cls from './AtricleImageBlockComponent.module.scss'

interface IAtricleImageBlockComponentProps {
    className?: string
    block: IArticleImageBlock
}

export const AtricleImageBlockComponent = memo((props: IAtricleImageBlockComponentProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.atricleImageBlockComponent, {}, [className])}>
            <img src={block.src} alt={block.title} className={cls.img} />

            {block.title && <Text text={block.title} align={ETextAlign.CENTER} />}
        </div>
    )
})
