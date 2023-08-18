import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { EArticleType, IArticle } from '@/entities/Article'
import { addQueryParams } from '@/shared/lib/url/addQueryParams/addQueryParams'
import {
    getArticlesPageLimit,
    getArticlesPageNum,
    getArticlesPageOrder,
    getArticlesPageSearch,
    getArticlesPageSort,
    getArticlesPageType,
} from '../../selectors/articlesPageSelectors'

interface IFetchArticlesListProps {
    // Когда мы подгружаем следующую порцию данных, мы хотим, чтобы новые данные добавлялись к имеющимся (articlesAdapter.addMany в articlesPageSlice)
    // Когда мы меняем порядок сортировки и параметр, по которому происходит сортировка, мы хотим, чтобы новые данные полностью заменили имеющиеся
    replaced?: boolean
}

export const fetchArticlesList = createAsyncThunk<IArticle[], IFetchArticlesListProps, IThunkConfig<string>>(
    'articlesPage/fetchArticlesList',
    async (props, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi
        const limit = getArticlesPageLimit(getState())
        const sort = getArticlesPageSort(getState())
        const order = getArticlesPageOrder(getState())
        const search = getArticlesPageSearch(getState())
        const page = getArticlesPageNum(getState())
        const type = getArticlesPageType(getState())

        try {
            // Добавляет перед фетчингом данных соответствующие апраметры пагинации в адресную строку
            addQueryParams({
                sort,
                order,
                search,
                type,
            })
            const response = await extra.api.get<IArticle[]>('/articles', {
                params: {
                    _expand: 'user',
                    _limit: limit,
                    _page: page,
                    _sort: sort,
                    _order: order,
                    q: search,
                    type: type === EArticleType.ALL ? undefined : type,
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
