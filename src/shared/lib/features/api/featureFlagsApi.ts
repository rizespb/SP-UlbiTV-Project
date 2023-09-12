import { rtkApi } from '@/shared/api/rtkApi'
import { FeatureFlags } from '@/shared/types/featureFlags'

interface UpdateFeatureFlagsOptions {
    // на вход принимает ID-пользователя
    userId: string
    // И объект с ФТ
    features: Partial<FeatureFlags>
}

// Функция, которая отправляет запрос на бэк для обновления значения ФТ
// Отправляет в body новые значения ФТ
const featureFlagsApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // mutation - т.к. меняет итнформацию на сервере
        updateFeatureFlags: build.mutation<void, UpdateFeatureFlagsOptions>({
            query: ({ userId, features }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    features,
                },
            }),
        }),
    }),
})

export const updateFeatureFlagsMutation =
    featureFlagsApi.endpoints.updateFeatureFlags.initiate
