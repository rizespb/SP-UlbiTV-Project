import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { USER_LOCALSTORAGE_KEY } from '@/shared/const/localstorage'
import { IUser, IUserSchema } from '../types/user'
import { setFeatureFlags } from '@/shared/lib/features'
import { IJsonSettings } from '../types/jsonSettings'
import { saveJsonSettings } from '../services/saveJsonSettings'
import { initAuthData } from '../services/initAuthData'

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

            localStorage.setItem(USER_LOCALSTORAGE_KEY, action.payload.id)
        },

        logout: (state) => {
            state.authData = undefined
            localStorage.removeItem(USER_LOCALSTORAGE_KEY)
        },
    },

    extraReducers: (builder) => {
        builder.addCase(
            // Можно обработать также кейсы для pending и rejected
            saveJsonSettings.fulfilled,
            (state, { payload }: PayloadAction<IJsonSettings>) => {
                if (state.authData) {
                    state.authData.jsonSettings = payload
                }
            },
        )

        builder.addCase(
            initAuthData.fulfilled,
            (state, { payload }: PayloadAction<IUser>) => {
                state.authData = payload

                setFeatureFlags(payload.features)

                state._inited = true
            },
        )

        builder.addCase(initAuthData.rejected, (state) => {
            state._inited = true
        })
    },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
