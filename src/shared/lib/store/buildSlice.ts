import { bindActionCreators, createSlice } from '@reduxjs/toolkit'
import { SliceCaseReducers, CreateSliceOptions } from '@reduxjs/toolkit/dist'
import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

// CreateSliceOptions - тип для аргумента createSlice, дженерик
// State, CaseReducers extends SliceCaseReducers<State>, Name extends string = string - это описание дженерика для createSlice из самого redux
export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
    // Создаем слайл
    const slice = createSlice(options)

    const useActions = (): typeof slice.actions => {
        const dispatch = useDispatch()

        // bindActionCreators - биндим экшены к диспатчу
        // Документация https://redux.js.org/api/bindactioncreators
        // useMemo - рекомендации издокументации redux
        // хук, который возвращает функцию для диспатча actions
        // Чтобы иметь возможность вызывать action-ы без диспатча
        // @ts-ignore
        return useMemo(
            // @ts-ignore
            () => bindActionCreators(slice.actions, dispatch),
            [dispatch],
        )
    }

    // Возвращаем сам слайс, как обычно
    // И хук, который возвращает функцию для диспатча actions
    // Чтобы иметь возможность вызывать action-ы без диспатча
    return {
        ...slice,
        useActions,
    }
}
