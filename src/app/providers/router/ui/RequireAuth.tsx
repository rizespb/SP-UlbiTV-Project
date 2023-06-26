import { getUserAuthData } from 'entities/User'
import { ReactElement } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useLocation } from 'react-router-dom'
import { RoutePath } from 'shared/config/routerConfig/routerConfig'

interface IRequireAuthProps {
    children: ReactElement
}

export const RequireAuth = (props: IRequireAuthProps) => {
    const { children } = props
    const auth = useSelector(getUserAuthData)
    const location = useLocation()

    if (!auth) {
        return <Navigate to={RoutePath.main} state={{ from: location }} replace />
    }

    return children
}
