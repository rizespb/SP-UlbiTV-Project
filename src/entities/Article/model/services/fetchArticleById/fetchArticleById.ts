import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { IArticle } from '../../types/article'

export const fetchArticleById = createAsyncThunk<IArticle, string, IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi
        try {
            const response = await extra.api.get<IArticle>(`/articles/${articleId}`)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            return rejectWithValue('Some error from fetchProfileData')
        }
    },
)
