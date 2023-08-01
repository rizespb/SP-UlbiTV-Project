import { IArticleDeatlsCommentsSchema } from './ArticleDeatlsCommentsSchema'
import { IArticleDetailsRecommendationsSchema } from './ArticleDetailsRecommendationsSchema'

export interface IArticleDetailsPageSchema {
    comments: IArticleDeatlsCommentsSchema
    recommendations: IArticleDetailsRecommendationsSchema
}
