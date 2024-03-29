import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { getUserDataByIdQuery } from '../../api/userApi'
import { IUser } from '../types/user'
import {
    LOCAL_STORAGE_LAST_DESIGN_KEY,
    USER_LOCALSTORAGE_KEY,
} from '@/shared/const/localstorage'

// Санки для получения данных о пользователе
// При авторизации сохраняем id пользователя в localStorage
// При следующем заходе на сайт подгружаем данные о user по этому id из localStorage
// IUser - то, что возвращаем
// void - на вход ничего не возвращаем
export const initAuthData = createAsyncThunk<IUser, void, IThunkConfig<string>>(
    'user/initAuthData',
    async (newJsonSettings, thunkApi) => {
        const { rejectWithValue, dispatch } = thunkApi

        // Получаем id пользователя из localStorage, сохраненный при прошлой авторизации
        const userId = localStorage.getItem(USER_LOCALSTORAGE_KEY)

        // Если id отсутствует, то ничего не делаем
        if (!userId) {
            return rejectWithValue('')
        }

        try {
            const response = await dispatch(
                getUserDataByIdQuery(userId),
            ).unwrap()

            // Сохраняем последний выбранный дизайн в localStorage, чтобы при следующем заходе во время инициализации приложения знать, какой дизайн показывать: новый или старый
            // Это же самое делаем в userSclice -> setAuthData (потому что не для всех кейсов срабатывало)
            localStorage.setItem(
                LOCAL_STORAGE_LAST_DESIGN_KEY,
                response.features?.isAppRedesigned ? 'new' : 'old',
            )

            return response
        } catch (e) {
            console.log(e)
            return rejectWithValue('')
        }
    },
)
