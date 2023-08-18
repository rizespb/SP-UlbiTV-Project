import { ReducersMapObject } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import i18nForTest from '@/shared/config/i18n/i18nForTest'

export interface ComponentRenderOptions {
    route?: string
    initialState?: DeepPartial<IStateSchema>

    // При рендере динамических компонентов, асинхронные рредюсоры будут добавлены во время рендера самого компонента через DynamicModuleLoader
    // Поле asyncReducers мы добавили, в первую очередь, для тех случаев, когда надо тестировать дочерние компоненты динамических компонентов (когда асинхронный редюсор подключается в родителе, а дочерний компонент итспользует этот редюсор)
    asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>
}

export function componentRender(component: ReactNode, options: ComponentRenderOptions = {}) {
    const { route = '/', initialState, asyncReducers } = options

    return render(
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider asyncReducers={asyncReducers} initialState={initialState as IStateSchema}>
                <I18nextProvider i18n={i18nForTest}>{component}</I18nextProvider>
            </StoreProvider>
        </MemoryRouter>,
    )
}
