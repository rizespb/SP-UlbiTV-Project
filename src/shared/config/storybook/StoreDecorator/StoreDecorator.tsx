/* eslint-disable indent */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { IStateSchema, StoreProvider } from 'app/providers/StoreProvider'
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice'
import { profileReducer } from 'entities/Profile'
import { loginReducer } from 'features/AuthByUsername/model/slice/loginSlice'
import { TReducerLIst } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: TReducerLIst = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
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
