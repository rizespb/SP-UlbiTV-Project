import { ECountry, ECurrency } from 'shared/const/common'

export interface IProfile {
    first: string
    lastname: string
    age: 22
    currency: ECurrency
    country: ECountry
    city: string
    username: string
    avatar: string
}

export interface IProfileSchema {
    data?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
}
