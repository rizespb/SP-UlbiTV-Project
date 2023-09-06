import { rtkApi } from '@/shared/api/rtkApi'
import { IUser } from '../model/types/user'
import { IJsonSettings } from '../model/types/jsonSettings'

interface ISetJsonSettingsArg {
    userId: string
    jsonSettings: IJsonSettings
}

// Это набор функций для асинхронных запросов (это не санки)
const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        // mutation - потому что это запрос на обновление данных, а не на получение данных
        // IUser - что возвращаем
        // ISetJsonSettingsArg какие пераметры передаем в setJsonSettings
        setJsonSettings: build.mutation<IUser, ISetJsonSettingsArg>({
            query: ({ userId, jsonSettings }) => ({
                url: `/users/${userId}`,
                method: 'PATCH',
                body: {
                    jsonSettings,
                },
            }),
        }),
        // При авторизации сохраняем id пользователя в localStorage
        // При следующем заходе на сайт подгружаем данные о user по этому id из localStorage
        // IUser - что возвращаем
        // string - что передаем в функцию (id пользователя)
        getUserDataById: build.query<IUser, string>({
            query: (userId) => ({
                url: `/users/${userId}`,
                method: 'GET',
            }),
        }),
    }),
})

// Спсобо работы с rtkApi без использования хука (т.к. использовать будем не в компоненте)
// В других местах использовали аналогичные api с помощью хука
export const setJsonSettingsMutation =
    userApi.endpoints.setJsonSettings.initiate

export const getUserDataByIdQuery = userApi.endpoints.getUserDataById.initiate
