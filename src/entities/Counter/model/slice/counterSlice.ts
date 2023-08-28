import { PayloadAction } from '@reduxjs/toolkit'
import { buildSlice } from '@/shared/lib/store'
import { ICounterSchema } from '../types/counterSchema'

const initialState: ICounterSchema = {
    value: 0,
}

// export const counterSlice = createSlice({
//     name: 'counter',
//     initialState,
//     reducers: {
//         increment: (state) => {
//             state.value += 1
//         },
//         decrement: (state) => {
//             state.value -= 1
//         },
//     },
// })

// export const { actions: counterActions } = counterSlice
// export const { reducer: counterReducer } = counterSlice

export const counterSlice = buildSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1
        },
        add: (state, { payload }: PayloadAction<number>) => {
            state.value += payload
        },
        decrement: (state) => {
            state.value -= 1
        },
    },
})

export const { actions: counterActions, reducer: counterReducer, useActions: useCounterActions } = counterSlice
