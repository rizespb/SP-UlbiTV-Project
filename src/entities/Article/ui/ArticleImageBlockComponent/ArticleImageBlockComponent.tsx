import { memo } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import { ETextAlign, Text as TextDeprecated } from '@/shared/ui/deprecated/Text'
import { IArticleImageBlock } from '../../model/types/article'
import cls from './ArticleImageBlockComponent.module.scss'
import { ToggleFeatures } from '@/shared/lib/features'
import { Text } from '@/shared/ui/redesigned/Text'

interface IArticleImageBlockComponentProps {
    className?: string
    block: IArticleImageBlock
}

export const ArticleImageBlockComponent = memo(
    (props: IArticleImageBlockComponentProps) => {
        const { className, block } = props

        return (
            <div
                className={classNames(cls.articleImageBlockComponent, {}, [
                    className,
                ])}
            >
                <img src={block.src} alt={block.title} className={cls.img} />

                {block.title && (
                    <ToggleFeatures
                        feature="isAppRedesigned"
                        on={<Text text={block.title} align="center" />}
                        off={
                            <TextDeprecated
                                text={block.title}
                                align={ETextAlign.CENTER}
                            />
                        }
                    />
                )}
            </div>
        )
    },
)
