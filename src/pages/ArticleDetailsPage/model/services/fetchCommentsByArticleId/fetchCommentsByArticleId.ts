import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { IComment } from 'entities/Comment'

export const fetchCommentsByArticleId = createAsyncThunk<IComment[], string | undefined, IThunkConfig<string>>(
    'profile/fetchCommentsByArticleId',
    async (articleId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi

        if (!articleId) {
            return rejectWithValue('Some error from fetchCommentsByArticleId')
        }

        try {
            const response = await extra.api.get<IComment[]>('/comments', {
                // Это query-параметры
                // Получить комменты по articleId
                // Коммент содержит только id-пользователя
                // _expand - получить всю инфу о пользователе
                params: {
                    articleId,
                    _expand: 'user',
                },
            })

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            return rejectWithValue('Some error from fetchCommentsByArticleId')
        }
    },
)
