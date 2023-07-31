import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { EArticleSortField, EArticleType } from 'entities/Article'
import { TSortOrder } from 'shared/types'
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const initArticlesPage = createAsyncThunk<void, URLSearchParams, IThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (searchParams, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const inited = getArticlesPageInited(getState())

        // Если мы второй раз попадаем на страницу со списком статей за один сеанс, то не происходит повторный фетчинг (данные уже были получены раньше)
        if (!inited) {
            // Параметры пагинации берем из адресной строки и потом используем в запросе за данынми
            const orderFromUrl = searchParams.get('order') as TSortOrder
            const sortFromUrl = searchParams.get('sort') as EArticleSortField
            const searchFromUrl = searchParams.get('search')
            const typeFromUrl = searchParams.get('type') as EArticleType

            if (orderFromUrl) {
                dispatch(articlesPageActions.setOrder(orderFromUrl))
            }
            if (sortFromUrl) {
                dispatch(articlesPageActions.setSort(sortFromUrl))
            }
            if (searchFromUrl) {
                dispatch(articlesPageActions.setSearch(searchFromUrl))
            }
            if (typeFromUrl) {
                dispatch(articlesPageActions.setType(typeFromUrl))
            }

            dispatch(articlesPageActions.initState())
            dispatch(fetchArticlesList({}))
        }
    },
)
