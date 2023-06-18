import { AnyAction, combineReducers, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { IReducerManager, IStateSchema, TStateSchemaKey } from './stateSchema'

// Фукнция создает корневой редюсор и позволяет удалить/добавить в него другие редюсоры в рантайме
// Для асинхронной подгрузки редюсоров
// Принимает дефолтные редюсоры
export function createReducerManager(initialReducers: ReducersMapObject<IStateSchema>): IReducerManager {
    const reducers = { ...initialReducers }

    // Создаем начальный корневой редюсор
    let combinedReducer = combineReducers(reducers)

    // Массив с названиями редюсоров, которые мы хотим удалить при первоначальной сборке и запуске приложения
    let keysToRemove: TStateSchemaKey[] = []

    return {
        getReducerMap: () => reducers,

        // РутРедюсор, которому будет передан стейт из из стейта будут удалены все слайсы, названия котороых мы поместили в keysToRemove

        reduce: (state: IStateSchema, action: AnyAction) => {
            if (keysToRemove.length > 0) {
                state = { ...state }

                keysToRemove.forEach((key) => {
                    delete state[key]
                })

                keysToRemove = []
            }

            // Передаем стейт и экшен корневому редюсоры
            return combinedReducer(state, action)
        },

        // Добавит в новый редюсер в корневой редюсор
        add: (key: TStateSchemaKey, reducer: Reducer) => {
            if (!key || reducers[key]) {
                return
            }

            // Добавляем в редюсоры новый редюсор по переданному ключу
            reducers[key] = reducer

            // Создаем новый корневой редюсор
            combinedReducer = combineReducers(reducers)
        },

        // Удалит редюсер из корневого редюсора
        remove: (key: TStateSchemaKey) => {
            if (!key || !reducers[key]) {
                return
            }

            // Remove it from the reducer mapping
            delete reducers[key]

            // Add the key to the list of keys to clean up
            keysToRemove.push(key)

            // Generate a new combined reducer
            combinedReducer = combineReducers(reducers)
        },
    }
}
