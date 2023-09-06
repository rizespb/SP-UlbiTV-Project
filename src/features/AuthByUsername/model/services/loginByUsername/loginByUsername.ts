import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { IUser, userActions } from '@/entities/User'

interface ILoginByUsernameProps {
    username: string
    password: string
}

export const loginByUsername = createAsyncThunk<
    IUser,
    ILoginByUsernameProps,
    IThunkConfig<string>
>('login/loginByUsername', async ({ username, password }, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi
    try {
        const response = await extra.api.post<IUser>('/login', {
            username,
            password,
        })

        if (!response.data) {
            throw new Error()
        }

        dispatch(userActions.setAuthData(response.data))

        return response.data
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)

        return rejectWithValue('Вы ввели неверный логин или пароль')
    }
})
