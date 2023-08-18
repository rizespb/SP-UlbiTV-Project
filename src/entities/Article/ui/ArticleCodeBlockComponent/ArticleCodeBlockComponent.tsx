import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code } from '@/shared/ui/Code/Code'
import { IArticleCodeBlock } from '../../model/types/article'
import cls from './ArticleCodeBlockComponent.module.scss'

interface IArticleCodeBlockComponentProps {
    className?: string
    block: IArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo((props: IArticleCodeBlockComponentProps) => {
    const { className, block } = props

    return (
        <div className={classNames(cls.articleCodeBlockComponent, {}, [className])}>
            <Code text={block.code} />
        </div>
    )
})
