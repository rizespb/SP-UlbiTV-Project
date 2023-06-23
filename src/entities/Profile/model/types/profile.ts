import { ECountry } from '../../../Country'
import { ECurrency } from '../../../Currency'

export interface IProfile {
    first?: string
    lastname?: string
    age?: number
    currency?: ECurrency
    country?: ECountry
    city?: string
    username?: string
    avatar?: string
}

export interface IProfileSchema {
    data?: IProfile
    form?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
}
