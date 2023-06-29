import { Reducer } from '@reduxjs/toolkit'
import { IReduxStoreWithManager, TStateSchemaKey } from 'app/providers/StoreProvider'
import { FC, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'

export type TReducerLIst = {
    [key in TStateSchemaKey]?: Reducer
}

interface IDynamicModuleLoaderProps {
    asyncReducers: TReducerLIst
    removeAfterUnmount?: boolean
}

export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props) => {
    const { asyncReducers, removeAfterUnmount, children } = props

    const dispatch = useDispatch()
    const store = useStore() as IReduxStoreWithManager

    // Асинхронная загрузка редюсора
    // ТОлько при монтировании DynamicModuleLoader мы добавляем asycReducer в стор
    useEffect(() => {
        Object.entries(asyncReducers).forEach(([reducerKey, asyncReducer]) => {
            store.reducerManager.add(reducerKey as TStateSchemaKey, asyncReducer)
            // Чтобы в Redux DevTools мы могли отследить добавление редюсора
            dispatch({ type: `@INIT ${reducerKey}` })
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(asyncReducers).forEach(([reducerKey, _asyncReducer]) => {
                    store.reducerManager.remove(reducerKey as TStateSchemaKey)

                    dispatch({ type: `@DESTROY ${reducerKey}` })
                })
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
}