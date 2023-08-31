import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { counterReducer } from '@/entities/Counter'
import { userReducer } from '@/entities/User'
import { uiReducer } from '@/features/UI'
import { $api } from '@/shared/api/api'
import { rtkApi } from '@/shared/api/rtkApi'
import { createReducerManager } from './reducerManager'
import { IStateSchema, IThunkExtraArgument } from './stateSchema'

// asyncReducers в качестве параметра функции createReduxStore добавили позже для того, чтобы при написании историй для асинхронных компоннентов можно было в StoreDecorator добавлять эти асинхронные редюсоры (которые используют асинхронные компоненты)
export function createReduxStore(
    initialState?: IStateSchema,
    asyncReducers?: ReducersMapObject<IStateSchema>,
) {
    // В рутРедюсор помещаем только обязательные редюсоры (не асинхронные) (см. комментарий выше)
    const rootReducer: ReducersMapObject<IStateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
        ui: uiReducer,

        // Подключение RTK Query: Подключаем редюсор для RTK Query
        [rtkApi.reducerPath]: rtkApi.reducer,
    }

    const reducerManager = createReducerManager(rootReducer)

    const extraArg: IThunkExtraArgument = {
        api: $api,
    }

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<IStateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        // Инстанс axios для использорвания внутри thunk
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: {
                    // Третим аргументов в thunk будет передваться extraArgument
                    extraArgument: extraArg,
                },
                // Подключение RTK Query:
            }).concat(rtkApi.middleware),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
