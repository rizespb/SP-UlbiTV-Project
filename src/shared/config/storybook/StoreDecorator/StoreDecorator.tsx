import { DeepPartial } from '@reduxjs/toolkit'
import { Story } from '@storybook/react'
import { IStateSchema, StoreProvider } from 'app/providers/StoreProvider'

export const StoreDecorator = (initialState: DeepPartial<IStateSchema>) => (StoryComponent: Story) =>
    (
        <StoreProvider initialState={initialState}>
            <StoryComponent />
        </StoreProvider>
    )
