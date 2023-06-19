import { configureStore, ReducersMapObject } from '@reduxjs/toolkit'
import { counterReducer } from 'entities/Counter'
import { userReducer } from 'entities/User'
import { createReducerManager } from './reducerManager'
import { IStateSchema } from './stateSchema'

// asyncReducers в качестве параметра функции createReduxStore добавили позже для того, чтобы при написании историй для асинхронных компоннентов можно было в StoreDecorator добавлять эти асинхронные редюсоры (которые используют асинхронные компоненты)
export function createReduxStore(initialState?: IStateSchema, asyncReducers?: ReducersMapObject<IStateSchema>) {
    // В рутРедюсор помещаем только обязательные редюсоры (не асинхронные) (см. комментарий выше)
    const rootReducer: ReducersMapObject<IStateSchema> = {
        ...asyncReducers,
        counter: counterReducer,
        user: userReducer,
    }

    const reducerManager = createReducerManager(rootReducer)

    const store = configureStore<IStateSchema>({
        reducer: reducerManager.reduce,
        devTools: __IS_DEV__,
        preloadedState: initialState,
    })

    // @ts-ignore
    store.reducerManager = reducerManager

    return store
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']
