import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { IProfile } from '../../types/profile'

export const fetchProfileData = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
    'profile/fetchProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue } = thunkApi
        try {
            const response = await extra.api.get<IProfile>('/profile')

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            console.log(error)

            return rejectWithValue('Some error from fetchProfileData')
        }
    },
)
