import { ReducersMapObject } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { I18nextProvider } from 'react-i18next'
import { MemoryRouter } from 'react-router-dom'
import { IStateSchema, StoreProvider } from '@/app/providers/StoreProvider'
import i18nForTest from '@/shared/config/i18n/i18nForTest'
// eslint-disable-next-line rizespb-fsd/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '@/shared/const/theme'

export interface IComponentRenderOptions {
    // Initila route для роутера
    route?: string
    initialState?: DeepPartial<IStateSchema>

    // При рендере динамических компонентов, асинхронные рредюсоры будут добавлены во время рендера самого компонента через DynamicModuleLoader
    // Поле asyncReducers мы добавили, в первую очередь, для тех случаев, когда надо тестировать дочерние компоненты динамических компонентов (когда асинхронный редюсор подключается в родителе, а дочерний компонент итспользует этот редюсор)
    asyncReducers?: DeepPartial<ReducersMapObject<IStateSchema>>

    // Тему добавили для изолированных тестов компонентов в cypress
    // Чтобы отрисовывались все стили
    theme?: Theme
}

interface ITestProviderProps {
    children: ReactNode
    options?: IComponentRenderOptions
}

export function TestProvider(props: ITestProviderProps) {
    const { children, options = {} } = props
    const {
        route = '/',
        initialState,
        asyncReducers,
        theme = Theme.LIGHT,
    } = options

    return (
        <MemoryRouter initialEntries={[route]}>
            <StoreProvider
                asyncReducers={asyncReducers}
                initialState={initialState}
            >
                <I18nextProvider i18n={i18nForTest}>
                    {/* Тему добавили для изолированных тестов компонентов в cypress // Чтобы отрисовывались все стили 
                    Но стили темы так и не подгружаются 
                    Возможно, надо подключать сами файлы со стилями темы в тесты
                    */}
                    <ThemeProvider initialTheme={theme}>
                        {/* <div className={`app ${theme}`}> */}
                        {children}
                        {/* </div> */}
                    </ThemeProvider>
                </I18nextProvider>
            </StoreProvider>
        </MemoryRouter>
    )
}

export function componentRender(
    component: ReactNode,
    options: IComponentRenderOptions = {},
) {
    return render(<TestProvider options={options}>{component}</TestProvider>)
}
