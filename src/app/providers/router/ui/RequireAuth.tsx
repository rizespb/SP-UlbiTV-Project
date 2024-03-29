import { ReactElement, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { EUserRole, getUserAuthData, getUserRoles } from '@/entities/User'
import { getRouteForbidden, getRouteMain } from '@/shared/const/router'

interface IRequireAuthProps {
    children: ReactElement
    roles?: EUserRole[]
}

// Проверяет авторизацию и роль пользователя (доступна ли пользователя конкретная страница)
export const RequireAuth = (props: IRequireAuthProps) => {
    const { children, roles } = props
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    // Массив ролей, которые есть у текущего пользователя
    const userRoles = useSelector(getUserRoles)

    const hasRequiredRoles = useMemo(() => {
        // Если список ролей не передан (роут доступен всем)
        if (!roles) {
            return true
        }

        // Проверяем: в списке переданных ролей есть у пользователя
        return roles.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole)
            return hasRole
        })
    }, [roles, userRoles])

    if (!auth) {
        return (
            <Navigate to={getRouteMain()} state={{ from: location }} replace />
        )
    }

    if (!hasRequiredRoles) {
        return (
            <Navigate
                to={getRouteForbidden()}
                state={{ from: location }}
                replace
            />
        )
    }

    return children
}
