import { CombinedState, configureStore, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { NavigateOptions, To } from 'react-router-dom'
import { $api } from 'shared/api/api'
import { createReducerManager } from './reducerManager'
import { IStateSchema, IThunkExtraArgument } from './stateSchema'

// asyncReducers в качестве параметра функции createReduxStore добавили позже для того, чтобы при написании историй для асинхронных компоннентов можно было в StoreDecorator добавлять эти асинхронные редюсоры (которые используют асинхронные компоненты)
export function createReduxStore(
    initialState?: IStateSchema,
    asyncReducers?: ReducersMapObject<IStateSchema>,
    // nagiate получаем с помощью useNavigate в StoreProvider для управления роутингом внутри стора
    navigate?: (to: To, options?: NavigateOptions) => void,
) {
    // В рутРедюсор помещаем только обязательные редюсоры (не асинхронные) (см. комментарий выше)
    const rootReducer: ReducersMapObject<IStateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducer)

    const extraArg: IThunkExtraArgument = {
        api: $api,
        navigate,
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
            }),
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
