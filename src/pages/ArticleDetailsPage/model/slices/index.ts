import { combineReducers } from '@reduxjs/toolkit'
import { IArticleDetailsPageSchema } from '../types'
import { articleDetailsPageRecommendationsReducer } from './articleDetailsPageRecommendationsSlice'
import { articleDetailsCommentsReducer } from './articleDetailsCommentsSlice'

// Группируем редюсоры
export const articleDetailsPageReducer = combineReducers<IArticleDetailsPageSchema>({
    recommendations: articleDetailsPageRecommendationsReducer,
    comments: articleDetailsCommentsReducer,
})
