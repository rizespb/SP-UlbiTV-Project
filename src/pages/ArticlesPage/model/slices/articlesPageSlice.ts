import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStateSchema } from 'app/providers/StoreProvider'
import { IArticle, EArticleView } from 'entities/Article'
import { ARTICLES_VIEW_LOCALSTORAGE_KEY } from 'shared/const/localstorage'
import { IArticlesPageSchema } from '../types/articlesPageSchema'
import { fetchArticlesList } from '../../model/services/fetchArticlesList/fetchArticlesList'

const articlesAdapter = createEntityAdapter<IArticle>({
    selectId: (article) => article.id,
})

export const getArticles = articlesAdapter.getSelectors<IStateSchema>(
    (state) => state.articlesPage || articlesAdapter.getInitialState(),
)

const articlesPageSlice = createSlice({
    name: 'articlesPageSlice',
    initialState: articlesAdapter.getInitialState<IArticlesPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        view: EArticleView.SMALL,
        page: 1,
        hasMore: true,
    }),
    reducers: {
        setView: (state, action: PayloadAction<EArticleView>) => {
            state.view = action.payload
            localStorage.setItem(ARTICLES_VIEW_LOCALSTORAGE_KEY, action.payload)
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        initState: (state) => {
            const view = localStorage.getItem(ARTICLES_VIEW_LOCALSTORAGE_KEY) as EArticleView

            state.view = view
            state.limit = view === EArticleView.BIG ? 4 : 9
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesList.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(fetchArticlesList.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
                state.isLoading = false
                // Не перезатираем данные, а добавляем в конец массива статей (чтобы работала подгрузка при скролле)
                // articlesAdapter.setAll(state, action.payload)
                articlesAdapter.addMany(state, action.payload)

                // если пришел пустой массив, то считаем, что данные закончились
                state.hasMore = action.payload.length > 0
            })
            .addCase(fetchArticlesList.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { reducer: articlesPageReducer, actions: articlesPageActions } = articlesPageSlice
