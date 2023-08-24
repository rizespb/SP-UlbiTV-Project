/* eslint-disable indent */
import { ReducersMapObject } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProvider'
// eslint-disable-next-line rizespb-fsd/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice'
// eslint-disable-next-line rizespb-fsd/public-api-imports
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice'
// eslint-disable-next-line rizespb-fsd/public-api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice'
// eslint-disable-next-line rizespb-fsd/public-api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice'
// eslint-disable-next-line rizespb-fsd/public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices'
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
