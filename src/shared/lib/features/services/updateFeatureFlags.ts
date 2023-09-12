import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi'
import { getAllFeatureFlags } from '../lib/setGetFeatures'

interface UpdateFeatureFlagOptions {
    userId: string

    // Объект с новыми ФТ (можно передать не все ФТ, а лишь те, которые хотим обновить)
    newFeatures: Partial<FeatureFlags>
}

// Ссанки для обновления ФТ на сервере
export const updateFeatureFlag = createAsyncThunk<
    void,
    // Интерфейс аргуента, передаваемого в санки
    UpdateFeatureFlagOptions,

    // string - тип, который принимает rejectWithValue
    IThunkConfig<string>
>('user/saveJsonSettings', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: {
                    // Получаем имеющиеся значения
                    ...getAllFeatureFlags(),
                    // Добавляем новые значения ФТ, перезатирая старые
                    ...newFeatures,
                },
            }),
        )

        window.location.reload()
        return undefined
    } catch (e) {
        console.log(e)
        return rejectWithValue('')
    }
})
