import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from '@/app/providers/StoreProvider'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { updateFeatureFlagsMutation } from '../api/featureFlagsApi'
import { getAllFeatureFlags, setFeatureFlags } from '../lib/setGetFeatures'

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
>('features/updateFeatureFlag', async ({ userId, newFeatures }, thunkApi) => {
    const { rejectWithValue, dispatch } = thunkApi

    const allFeatures = {
        // Получаем имеющиеся значения
        ...getAllFeatureFlags(),
        // Добавляем новые значения ФТ, перезатирая старые
        ...newFeatures,
    }

    try {
        await dispatch(
            updateFeatureFlagsMutation({
                userId,
                features: allFeatures,
            }),
        )

        setFeatureFlags(allFeatures)

        window.location.reload()

        return undefined
    } catch (e) {
        console.log(e)
        return rejectWithValue('')
    }
})
