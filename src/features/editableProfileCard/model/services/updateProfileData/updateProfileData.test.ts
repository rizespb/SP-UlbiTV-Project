import { ECountry } from '@/entities/Country'
import { ECurrency } from '@/entities/Currency'
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { EValidateProfileError } from '../../consts/consts'
import { updateProfileData } from './updateProfileData'

const data = {
    username: 'admin',
    age: 22,
    country: ECountry.Belarus,
    lastname: 'ulbi tv',
    first: 'asd',
    city: 'asf',
    currency: ECurrency.USD,
    id: '1',
}

describe('updateProfileData.test', () => {
    test('success', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        })

        thunk.api.put.mockReturnValue(Promise.resolve({ data }))

        const result = await thunk.callThunk()

        expect(thunk.api.put).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(data)
    })

    test('error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: data,
            },
        })
        thunk.api.put.mockReturnValue(Promise.resolve({ status: 403 }))

        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([EValidateProfileError.SERVER_ERROR])
    })

    test('validate error', async () => {
        const thunk = new TestAsyncThunk(updateProfileData, {
            profile: {
                form: { ...data, lastname: '' },
            },
        })
        const result = await thunk.callThunk()

        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toEqual([EValidateProfileError.INCORRECT_USER_DATA])
    })
})
