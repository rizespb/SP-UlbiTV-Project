// Фича для сохранения позиция скролла на конкретной страницы в сторе

export type { UISchema } from './model/types/UISchema'

export { getUIScrollByPath } from './model/selectors/ui'
export { uiReducer, uiActions } from './model/slices/UISlice'
