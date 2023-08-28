import { screen } from '@testing-library/react'
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender'
import AppRouter from './AppRouter'
import { getRouteAbout, getRouteAdmin, getRouteProfile } from '@/shared/const/router'
import { EUserRole } from '@/entities/User'

describe('app/router/AppRouter', () => {
    test('Страница должна отрендериться', async () => {
        componentRender(<AppRouter />, {
            // Initial route для роутера
            route: getRouteAbout(),
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('AboutPage')
        expect(page).toBeInTheDocument()
    })

    test('Страница не найдена', async () => {
        componentRender(<AppRouter />, {
            // Initial route для роутера (несуществующий)
            route: '/asfasfasfasf',
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('NotFoundPage')
        expect(page).toBeInTheDocument()
    })

    test('Редирект неавторизованного пользователя на главную', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('MainPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ к закрытой страницы для авторизованного пользователя', async () => {
        componentRender(<AppRouter />, {
            route: getRouteProfile('1'),
            initialState: {
                // Пользователь авторизован, если о нем есть данные в стейте
                user: { _inited: true, authData: {} },
            },
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('ProfilePage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ запрещен (отсутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            // Отсутствует роль EUserRole.ADMIN
            initialState: {
                user: { _inited: true, authData: {} },
            },
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('ForbiddenPage')
        expect(page).toBeInTheDocument()
    })

    test('Доступ разрешен (присутствует роль)', async () => {
        componentRender(<AppRouter />, {
            route: getRouteAdmin(),
            initialState: {
                user: { _inited: true, authData: { roles: [EUserRole.ADMIN] } },
            },
        })

        // await используем, т.к. внутри в AppRouter используется Suspense
        const page = await screen.findByTestId('AdminPanelPage')
        expect(page).toBeInTheDocument()
    })
})
