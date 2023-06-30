import { memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import { Code } from 'shared/ui/Code/Code'
import { IArticleCodeBlock } from '../../model/types/article'
import cls from './AtricleCodeBlockComponent.module.scss'

interface IAtricleCodeBlockComponentProps {
    className?: string
    block: IArticleCodeBlock
}

export const AtricleCodeBlockComponent = memo((props: IAtricleCodeBlockComponentProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.atricleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    )
})
