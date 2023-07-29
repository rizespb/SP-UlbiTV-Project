import { AnyAction, CombinedState, EnhancedStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { AxiosInstance } from 'axios'
import { IArticleDetailsSchema } from 'entities/Article'
import { ICounterSchema } from 'entities/Counter'
import { IProfileSchema } from 'entities/Profile'
import { IUserSchema } from 'entities/User'
import { IAddCommentFormSchema } from 'features/addCommentForm'
import { ILoginSchema } from 'features/AuthByUsername'
import { IArticleDeatlsCommentsSchema } from 'pages/ArticleDetailsPage'
import { IArticlesPageSchema } from 'pages/ArticlesPage'

export interface IStateSchema {
    counter: ICounterSchema
    user: IUserSchema

    // Асинхронные редюсоры
    loginForm?: ILoginSchema
    profile?: IProfileSchema
    articleDetails?: IArticleDetailsSchema
    articleDetailsComments?: IArticleDeatlsCommentsSchema
    addCommentForm?: IAddCommentFormSchema
    articlesPage?: IArticlesPageSchema
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
