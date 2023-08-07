import { memo, Suspense, useCallback } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routeConfig, TAppRoutesProps } from 'shared/config/routerConfig/routerConfig'
import { PageLoader } from 'widgets/PageLoader/PageLoader'
import { RequireAuth } from './RequireAuth'

const AppRouter = () => {
    const renderWithWrapper = useCallback((route: TAppRoutesProps) => {
        const element = <Suspense fallback={<PageLoader />}>{route.element}</Suspense>

        return (
            <Route
                key={route.path}
                path={route.path}
                element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
            />
        )
    }, [])

    return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>
}

export default memo(AppRouter)
