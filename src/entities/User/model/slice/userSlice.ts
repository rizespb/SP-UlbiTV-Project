import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { IUser, IUserSchema } from '../types/user'
import { setFeatureFlags } from '@/shared/lib/features'

const initialState: IUserSchema = {
    // AppRouеter вначале отрисовывается, а потом в App в useEffect происходит проветка в localStorage: авторизован пользователь или нет. То есть, внчале рисуются роуты, потом проверяется, авторизован ли пользователь. Поэтому все authOnly роуты будут редиректить на главную (как будто пользователь не авторизован). Решили, что будем отрисовывать роуты, только если _inited = true
    _inited: false,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setAuthData: (state, action: PayloadAction<IUser>) => {
            state.authData = action.payload
            setFeatureFlags(action.payload.features)
        },
        // Проверка авторизационных данных в localStorage при запуске приложения
        initAuthData: (state) => {
            const user = localStorage.getItem(USER_LOCALSTORAGE_KEY)

            if (user) {
                const json = JSON.parse(user) as IUser
                state.authData = json

                setFeatureFlags(json.features)
            }

            state._inited = true
        },
        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
