import { IStateSchema } from 'app/providers/StoreProvider'
import { createSelector } from '@reduxjs/toolkit'

export const getUIScroll = (state: IStateSchema) => state.ui.scroll

export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: IStateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
)
