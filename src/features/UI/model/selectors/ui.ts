import { createSelector } from '@reduxjs/toolkit'
import { IStateSchema } from '@/app/providers/StoreProvider'

export const getUIScroll = (state: IStateSchema) => state.ui.scroll

export const getUIScrollByPath = createSelector(
    getUIScroll,
    (state: IStateSchema, path: string) => path,
    (scroll, path) => scroll[path] || 0,
)
