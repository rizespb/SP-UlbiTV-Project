import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { getArticlesPageInited } from '../../selectors/articlesPageSelectors'
import { articlesPageActions } from '../../slices/articlesPageSlice'
import { fetchArticlesList } from '../fetchArticlesList/fetchArticlesList'

export const initArticlesPage = createAsyncThunk<void, void, IThunkConfig<string>>(
    'articlesPage/initArticlesPage',
    async (_, thunkApi) => {
        const { getState, dispatch } = thunkApi
        const inited = getArticlesPageInited(getState())

        // Если мы второй раз попадаем на страницу со списком статей за один сеанс, то не происходит повторный фетчинг (данные уже были получены раньше)
        if (!inited) {
            dispatch(articlesPageActions.initState())
            dispatch(
                fetchArticlesList({
                    page: 1,
                }),
            )
        }
    },
)
