import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig, IThunkExtraArgument } from 'app/providers/StoreProvider'
import axios from 'axios'
import { IUser, userActions } from 'entities/User'
import { USER_LOCALSTORAGE_KEY } from 'shared/const/localstorage'

interface ILoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<IUser, ILoginByUsernameProps, IThunkConfig<string>>(
    'login/loginByUsername',
    async ({ username, password }, thunkApi) => {
        const { dispatch, extra, rejectWithValue } = thunkApi
        try {
            const response = await extra.api.post<IUser>('/login', {
                username,
                password,
            })

            if (!response.data) {
                throw new Error()
            }

            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data))
            dispatch(userActions.setAuthData(response.data))

            extra.navigate('/about')

            return response.data
        } catch (error) {
            console.log(error)

            return rejectWithValue('Вы ввели неверный логин или пароль')
        }
    },
)
