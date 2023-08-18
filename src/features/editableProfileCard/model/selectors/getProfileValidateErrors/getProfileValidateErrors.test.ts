import { IStateSchema } from '@/app/providers/StoreProvider'
import { EValidateProfileError } from '../../consts/consts'
import { getProfileValidateErrors } from './getProfileValidateErrors'

describe('getProfileValidateErrors.test', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                validateErrors: [EValidateProfileError.SERVER_ERROR, EValidateProfileError.INCORRECT_AGE],
            },
        }
        expect(getProfileValidateErrors(state as IStateSchema)).toEqual([
            EValidateProfileError.SERVER_ERROR,
            EValidateProfileError.INCORRECT_AGE,
        ])
    })
    test('should work with empty state', () => {
        const state: DeepPartial<IStateSchema> = {}
        expect(getProfileValidateErrors(state as IStateSchema)).toEqual(undefined)
    })
})
