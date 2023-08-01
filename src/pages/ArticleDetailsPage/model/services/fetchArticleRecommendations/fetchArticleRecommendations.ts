import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { IArticle } from 'entities/Article'

export const fetchArticleRecommendations = createAsyncThunk<IArticle[], void, IThunkConfig<string>>(
    'articleDetailsPage/fetchArticleRecommendations',
    async (props, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        try {
            // это фейковый запрос за рекомендациями: просто получаем 4 статьи
            const response = await extra.api.get<IArticle[]>('/articles', {
                params: {
                    _limit: 4,
                },
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (e) {
            return rejectWithValue('error')
        }
    },
)
