import { IArticleBlock } from '../../model/types/article'
import { EArticleBlockType } from '../../model/consts/articleConsts'
import { ArticleCodeBlockComponent } from '../ArticleCodeBlockComponent/ArticleCodeBlockComponent'
import cls from './ArticleDetails.module.scss'
import { ArticleImageBlockComponent } from '../ArticleImageBlockComponent/ArticleImageBlockComponent'
import { ArticleTextBlockComponent } from '../ArticleTextBlockComponent/ArticleTextBlockComponent'

export const renderArticleBlock = (block: IArticleBlock) => {
    switch (block.type) {
        case EArticleBlockType.CODE:
            return (
                <ArticleCodeBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            )
        case EArticleBlockType.IMAGE:
            return (
                <ArticleImageBlockComponent
                    key={block.id}
                    block={block}
                    className={cls.block}
                />
            )
        case EArticleBlockType.TEXT:
            return (
                <ArticleTextBlockComponent
                    key={block.id}
                    className={cls.block}
                    block={block}
                />
            )
        default:
            return null
    }
}
