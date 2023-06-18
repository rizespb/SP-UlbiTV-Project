/* eslint-disable indent */
import { DeepPartial, ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { IStateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'

const defaultAsyncReducers: DeepPartial<ReducersMapObject<IStateSchema>> = {
    loginForm: loginReducer,
}

export const StoreDecorator =
    (initialState: DeepPartial<IStateSchema>, asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>) =>
    (StoryComponent: Story) =>
        (
            <StoreProvider
                initialState={initialState}
                asyncReducers={{
                    ...defaultAsyncReducers,
                    ...asyncReducers,
                }}
            >
                <StoryComponent />
            </StoreProvider>
        )
