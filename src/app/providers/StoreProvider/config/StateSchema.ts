import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { IArticleDetailsSchema } from 'entities/Article'
import { ICounterSchema } from 'entities/Counter'
import { IProfileSchema } from 'entities/Profile'
import { IUserSchema } from 'entities/User'
import { IAddCommentFormSchema } from 'features/addCommentForm'
import { ILoginSchema } from 'features/AuthByUsername'
import { UISchema } from 'features/UI'
import { IArticleDetailsPageSchema } from 'pages/ArticleDetailsPage'
import { IArticlesPageSchema } from 'pages/ArticlesPage'

export interface IStateSchema {
    counter: ICounterSchema
    user: IUserSchema
    // Слайс для хранения данных о позиции скролла на каждой странице (и, возможно, других Ui-фишках)
    ui: UISchema

    // Асинхронные редюсоры
    loginForm?: ILoginSchema
    profile?: IProfileSchema
    // Это стайл Статьи (в часности, загрузка статьи по ID)
    articleDetails?: IArticleDetailsSchema
    addCommentForm?: IAddCommentFormSchema
    articlesPage?: IArticlesPageSchema
    // Это слайс с комментариями и рекомендациями
    articleDetailsPage?: IArticleDetailsPageSchema
}

export type TStateSchemaKey = keyof IStateSchema

export type TMountedReducers = OptionalRecord<TStateSchemaKey, boolean>

export interface IReducerManager {
    getReducerMap: () => ReducersMapObject<IStateSchema>
    reduce: (state: IStateSchema, action: AnyAction) => CombinedState<IStateSchema>
    add: (key: TStateSchemaKey, reducer: Reducer) => void
    remove: (key: TStateSchemaKey) => void

    // Карта смонтированных редюсоров
    // true - вмонтирован, false - не вмонитрован
    getMountedReducers: () => TMountedReducers
}

export interface IReduxStoreWithManager extends EnhancedStore<IStateSchema> {
    reducerManager: IReducerManager
}

export interface IThunkExtraArgument {
    api: AxiosInstance
}

export interface IThunkConfig<T> {
    rejectValue: T
    extra: IThunkExtraArgument
    state: IStateSchema
}
