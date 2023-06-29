import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchArticleById } from '../services/fetchArticleById/fetchArticleById'
import { IArticle } from '../types/article'
import { IArticleDetailsSchema } from '../types/articleDetailsSchema'

const initialState: IArticleDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,
}

export const articleDetailsSlice = createSlice({
    name: 'articleDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticleById.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticleById.fulfilled, (state, action: PayloadAction<IArticle>) => {
                state.isLoading = false

                state.data = action.payload
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: articleDetailsActions } = articleDetailsSlice
export const { reducer: articleDetailsReducer } = articleDetailsSlice
