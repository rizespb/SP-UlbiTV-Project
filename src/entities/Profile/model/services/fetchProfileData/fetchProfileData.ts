import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { IProfile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<IProfile, string, IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (profileId, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi
        try {
            const response = await extra.api.get<IProfile>(`/profile/${profileId}`)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error)

            return rejectWithValue('Some error from fetchProfileData')
        }
    },
)
