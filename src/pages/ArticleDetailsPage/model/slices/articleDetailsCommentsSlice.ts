import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStateSchema } from 'app/providers/StoreProvider'
import { IComment } from 'entities/Comment'
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId'
import { IArticleDeatlsCommentsSchema } from '../types/ArticleDeatlsCommentsSchema'

// Нормализация данных комментариев
const commentsAdapter = createEntityAdapter<IComment>({
    // Надо указать, какое поле в сущности является id
    selectId: (comment) => comment.id,
})

// Это селекторы
export const getArticleComments = commentsAdapter.getSelectors<IStateSchema>(
    (state) => state.articleDetailsComments || commentsAdapter.getInitialState(),
)

const articleDetailsCommentsSlice = createSlice({
    name: 'articleDetailsCommentsSlice',
    // Инициализируем стейт
    initialState: commentsAdapter.getInitialState<IArticleDeatlsCommentsSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
    }),
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentsByArticleId.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchCommentsByArticleId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.isLoading = false

                // Далее Редакс самостоятельно нормализует данные и заполнит ids и entities
                commentsAdapter.setAll(state, action.payload)
            })
            .addCase(fetchCommentsByArticleId.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articleDetailsCommentsReducer } = articleDetailsCommentsSlice
export const { actions: articleDetailsCommentsActions } = articleDetailsCommentsSlice
