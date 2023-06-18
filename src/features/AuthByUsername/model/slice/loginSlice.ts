import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { loginByUsername } from '../../services/loginByUsername/loginByUsername'
import { ILoginSchema } from '../types/loginSchema'

const initialState: ILoginSchema = {
    isLoading: false,
    username: '',
    password: '',
}

// Сделали асинхронной загрузку LoginForm и также сделаем асинхронной (динамической) загрузку слайса loginSlice - она нам нужен только для авторизации. Поэтому будем подгружать его только при открытии формы авторизации

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined
                state.isLoading = true
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const { actions: loginActions } = loginSlice
export const { reducer: loginReducer } = loginSlice
