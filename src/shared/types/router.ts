import { RouteProps } from 'react-router-dom'
import { EUserRole } from '@/entities/User'

export type TAppRoutesProps = RouteProps & {
    // Страница доступна только авторизованным пользователям
    authOnly?: boolean

    // Роли, для которых доступна страница
    roles?: EUserRole[]
}
