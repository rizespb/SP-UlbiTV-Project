import { createAsyncThunk } from '@reduxjs/toolkit'
import { IThunkConfig } from 'app/providers/StoreProvider'
import { getProfileForm } from '../../selectors/getProfileForm/getProfileForm'
import { IProfile } from '../../types/profile'

export const updateProfileData = createAsyncThunk<IProfile, void, IThunkConfig<string>>(
    'profile/updateProfileData',
    async (_, thunkApi) => {
        const { extra, rejectWithValue, getState } = thunkApi

        const formData = getProfileForm(getState())

        try {
            const response = await extra.api.put<IProfile>('/profile', formData)

            if (!response.data) {
                throw new Error()
            }

            return response.data
        } catch (error) {
            console.log(error)

            return rejectWithValue('Some error from updateProfileData')
        }
    },
)
