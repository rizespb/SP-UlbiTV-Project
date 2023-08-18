import { IProfile } from '@/entities/Profile'
import { EValidateProfileError } from '../consts/consts'

export interface IProfileSchema {
    data?: IProfile
    form?: IProfile
    isLoading: boolean
    error?: string
    readonly: boolean
    validateErrors?: EValidateProfileError[]
}
