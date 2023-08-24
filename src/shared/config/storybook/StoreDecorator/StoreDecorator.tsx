/* eslint-disable indent */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import { articleDetailsReducer } from '@/entities/Article/testing'
import { addCommentFormReducer } from '@/features/addCommentForm/testing'
import { loginReducer } from '@/features/AuthByUsername/testing'
import { profileReducer } from '@/features/editableProfileCard/testing'
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/testing'
import { TReducerLIst } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader'

const defaultAsyncReducers: TReducerLIst = {
    loginForm: loginReducer,
    profile: profileReducer,
    articleDetails: articleDetailsReducer,
    addCommentForm: addCommentFormReducer,
    articleDetailsPage: articleDetailsPageReducer,
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
