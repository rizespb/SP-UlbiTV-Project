import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { IJsonSettings } from '../types/jsonSettings'
import { getUserAuthData } from '../selectors/getUserAuthData/getUserAuthData'
import { getJsonSettings } from '../selectors/jsonSettings'
import { setJsonSettingsMutation } from '../../api/userApi'

// Санкки для сохранения настроек пользователя на бэке
export const saveJsonSettings = createAsyncThunk<
    // Интерфейс того, что возвращают санки
    IJsonSettings,
    // Интерфейс первого аргумента, который будет передан в санки
    IJsonSettings,
    // Интерфейс вторго аргумента - thunkApi
    IThunkConfig<string>
>('user/saveJsonSettings', async (newJsonSettings, thunkApi) => {
    const { rejectWithValue, getState, dispatch } = thunkApi

    // Получаем данные о текущем пользователе с помощью селектора
    const userData = getUserAuthData(getState())
    // Получаем текущие настройки с помощью селектора
    const currentSettings = getJsonSettings(getState())

    if (!userData) {
        return rejectWithValue('')
    }

    try {
        // Диспатчим api-функцию для обновления настроек пользователя на бэке
        const response = await dispatch(
            setJsonSettingsMutation({
                userId: userData.id,
                jsonSettings: {
                    ...currentSettings,
                    ...newJsonSettings,
                },
            }),
            // Без unwrap мы получили бы в response или объект с полем data, содержащим IUser, или объект с полем error
        ).unwrap()

        if (!response.jsonSettings) {
            return rejectWithValue('')
        }

        return response.jsonSettings
    } catch (e) {
        console.log(e)
        return rejectWithValue('')
    }
})
