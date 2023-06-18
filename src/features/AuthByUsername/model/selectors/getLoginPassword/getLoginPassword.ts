import { IStateSchema } from 'app/providers/StoreProvider'

//  или '' - т.к. слайс loginSlice грузим асинхронно и на момент монтирования компонента стейта loginForm не существует (undefined)
export const getLoginPassword = (state: IStateSchema) => state?.loginForm?.password || ''
