export interface IUser {
    id: string
    username: string
}

// Интерфейс для стейта
export interface IUserSchema {
    authData?: IUser
}
