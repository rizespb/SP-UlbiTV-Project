export interface IUser {
    id: string
    username: string
    avatar?: string
}

// Интерфейс для стейта
export interface IUserSchema {
    authData?: IUser

    // AppRouеter вначале отрисовывается, а потом в App в useEffect происходит проветка в localStorage: авторизован пользователь или нет. То есть, внчале рисуются роуты, потом проверяется, авторизован ли пользователь. Поэтому все authOnly роуты будут редиректить на главную (как будто пользователь не авторизован). Решили, что будем отрисовывать роуты, только если _inited = true
    _inited: boolean
}
