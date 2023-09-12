import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { Code as CodeDeprecated } from '@/shared/ui/deprecated/Code'
import { IArticleCodeBlock } from '../../model/types/article'
import cls from './ArticleCodeBlockComponent.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { Code } from '@/shared/ui/redesigned/Code'

interface IArticleCodeBlockComponentProps {
    className?: string
    block: IArticleCodeBlock
}

export const ArticleCodeBlockComponent = memo(
    (props: IArticleCodeBlockComponentProps) => {
        const { className, block } = props

        return (
            <div
                className={classNames(cls.articleCodeBlockComponent, {}, [
                    className,
                ])}
            >
                <ToggleFeatures
                    feature="isAppRedesigned"
                    on={<Code text={block.code} />}
                    off={<CodeDeprecated text={block.code} />}
                />
            </div>
        )
    },
)
