import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { IArticle } from '../../types/article'

export const fetchArticleById = createAsyncThunk<
    IArticle,
    string | undefined,
    IThunkConfig<string>
>('profile/fetchProfileData', async (articleId, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi

    try {
        if (!articleId) {
            throw new Error('Статья не найдена')
        }

        const response = await extra.api.get<IArticle>(
            `/articles/${articleId}`,
            {
                params: {
                    _expand: 'user',
                },
            },
        )

        if (!response.data) {
            throw new Error()
        }

        return response.data
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        return rejectWithValue('Some error from fetchProfileData')
    }
})
