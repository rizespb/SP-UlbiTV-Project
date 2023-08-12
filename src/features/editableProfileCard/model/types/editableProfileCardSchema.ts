import { IProfile } from 'entities/Profile'

export enum EValidateProfileError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}

export interface IProfileSchema {
    data?: IProfile
    form?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateErrors?: EValidateProfileError[]
}
