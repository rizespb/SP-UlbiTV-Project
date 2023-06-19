import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IProfile, IProfileSchema } from '../types/profile'

const initialState: IProfileSchema = {
    isLoading: false,
    readonly: true,
    error: undefined,
    data: undefined,
}

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {},
})

export const { actions: profileActions } = profileSlice
export const { reducer: profileReducer } = profileSlice
