import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { getArticleDetailsData } from '@/entities/Article'
import { IComment } from '@/entities/Comment'
import { getUserAuthData } from '@/entities/User'
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId'

export const addCommentForArticle = createAsyncThunk<IComment, string, IThunkConfig<string>>(
    'articleDetails/addCommentForArticle',
    async (text, thunkApi) => {
        const { dispatch, extra, rejectWithValue, getState } = thunkApi

        const userData = getUserAuthData(getState())
        const article = getArticleDetailsData(getState())

        if (!userData || !text || !article) {
            return rejectWithValue('Error from addCommentForArticle: NO DATA')
        }

        try {
            const response = await extra.api.post<IComment>('/comments', {
                articleId: article?.id,
                userId: userData.id,
                text,
            })

            if (!response.data) {
                throw new Error()
            }

            dispatch(fetchCommentsByArticleId(article.id))

            return response.data
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            return rejectWithValue('Error from addCommentForArticle')
        }
    },
)
