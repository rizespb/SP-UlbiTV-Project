import { IStateSchema } from 'app/providers/StoreProvider'
import { getProfileForm } from './getProfileForm'
import { ECountry } from '../../../../Country'
import { ECurrency } from '../../../../Currency'

describe('getProfileForm.test', () => {
    test('should return error', () => {
        const data = {
            username: 'admin',
            age: 22,
            country: ECountry.Belarus,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asf',
            currency: ECurrency.USD,
        }
        const state: DeepPartial<IStateSchema> = {
            profile: {
                form: data,
            },
        }
        expect(getProfileForm(state as IStateSchema)).toEqual(data)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<IStateSchema> = {}
        expect(getProfileForm(state as IStateSchema)).toEqual(undefined)
    })
})
