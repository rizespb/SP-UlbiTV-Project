import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { IStateSchema } from '../config/stateSchema'
import { createReduxStore } from '../config/store'

interface StoreProviderProps {
    children?: ReactNode
    initialState?: IStateSchema
}

export const StoreProvider = (props: StoreProviderProps) => {
    const { children, initialState } = props

    const store = createReduxStore(initialState as IStateSchema)

    return <Provider store={store}>{children}</Provider>
}
