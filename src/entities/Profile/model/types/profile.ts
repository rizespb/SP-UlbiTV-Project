import { ECountry } from '../../../Country'
import { ECurrency } from '../../../Currency'

export interface IProfile {
    id?: string
    first?: string
    lastname?: string
    age?: number
    currency?: ECurrency
    country?: ECountry
    city?: string
    username?: string
    avatar?: string
}
