import { IProfile } from '@/entities/Profile'
import { EValidateProfileError } from '../../consts/consts'

export const validateProfileData = (profile?: IProfile) => {
    if (!profile) {
        return [EValidateProfileError.NO_DATA]
    }

    const { first, lastname, age, country } = profile

    const errors: EValidateProfileError[] = []

    if (!first || !lastname) {
        errors.push(EValidateProfileError.INCORRECT_USER_DATA)
    }

    if (!age || !Number.isInteger(age)) {
        errors.push(EValidateProfileError.INCORRECT_AGE)
    }

    if (!country) {
        errors.push(EValidateProfileError.INCORRECT_COUNTRY)
    }

    return errors
}
