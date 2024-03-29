import { Reducer } from '@reduxjs/toolkit'
import { FC, ReactNode, useEffect } from 'react'
import { useDispatch, useStore } from 'react-redux'
import {
    IReduxStoreWithManager,
    IStateSchema,
    TStateSchemaKey,
} from '@/app/providers/StoreProvider'

export type TReducerLIst = {
    [key in TStateSchemaKey]?: Reducer<NonNullable<IStateSchema[key]>>
}

interface IDynamicModuleLoaderProps {
    asyncReducers: TReducerLIst
    removeAfterUnmount?: boolean
    children: ReactNode
}

// Компонент осуществляет динамическую загрузку редюсора
// То есть переданные редюсоры (asyncReducers) будут подключен к стейту только при монтировании компонента
// Так же можно передать проп, который будет удалять или не удалять редюсор (и соответствующую часть стейта) из стейта после размонтирования компонента
export const DynamicModuleLoader: FC<IDynamicModuleLoaderProps> = (props) => {
    const { asyncReducers, removeAfterUnmount = true, children } = props

    const dispatch = useDispatch()
    const store = useStore() as IReduxStoreWithManager

    // Асинхронная загрузка редюсора
    // ТОлько при монтировании DynamicModuleLoader мы добавляем asycReducer в стор
    useEffect(() => {
        const mountedReducers = store.reducerManager.getMountedReducers()

        Object.entries(asyncReducers).forEach(([reducerKey, asyncReducer]) => {
            const mounted = mountedReducers[reducerKey as TStateSchemaKey]

            if (!mounted) {
                store.reducerManager.add(
                    reducerKey as TStateSchemaKey,
                    asyncReducer,
                )
                // Чтобы в Redux DevTools мы могли отследить добавление редюсора
                dispatch({ type: `@INIT ${reducerKey}` })
            }
        })

        return () => {
            if (removeAfterUnmount) {
                Object.entries(asyncReducers).forEach(
                    ([reducerKey, _asyncReducer]) => {
                        store.reducerManager.remove(
                            reducerKey as TStateSchemaKey,
                        )

                        dispatch({ type: `@DESTROY ${reducerKey}` })
                    },
                )
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
}
