import { IStateSchema } from '@/app/providers/StoreProvider'
import { ECountry } from '@/entities/Country'
import { ECurrency } from '@/entities/Currency'
import { getProfileData } from './getProfileData'

describe('getProfileData.test', () => {
    test('should return error', () => {
        const data = {
            username: 'admin',
            age: 22,
            country: ECountry.China,
            lastname: 'ulbi tv',
            first: 'asd',
            city: 'asf',
            currency: ECurrency.USD,
        }
        const state: DeepPartial<IStateSchema> = {
            profile: {
                data,
            },
        }
        expect(getProfileData(state as IStateSchema)).toEqual(data)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<IStateSchema> = {}
        expect(getProfileData(state as IStateSchema)).toEqual(undefined)
    })
})
