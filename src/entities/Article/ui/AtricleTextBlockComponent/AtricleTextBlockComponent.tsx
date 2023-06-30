import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Text } from 'shared/ui/Text/Text'
import { IArticleTextBlock } from '../../model/types/article'
import cls from './AtricleTextBlockComponent.module.scss'

interface IAtricleTextBlockComponentProps {
    className?: string
    block: IArticleTextBlock
}

export const AtricleTextBlockComponent = memo((props: IAtricleTextBlockComponentProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.atricleTextBlockComponent, {}, [className])}>
            {block.title && <Text title={block.title} className={cls.title} />}

            {block.paragraphs.map((paragraph) => (
                <Text key={paragraph} text={paragraph} className={cls.paragraph} />
            ))}
        </div>
    )
})
