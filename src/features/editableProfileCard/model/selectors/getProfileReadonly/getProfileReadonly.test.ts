import { IStateSchema } from '@/app/providers/StoreProvider'
import { getProfileReadonly } from './getProfileReadonly'

describe('getProfileReadonly.test', () => {
    test('should work with filled state', () => {
        const state: DeepPartial<IStateSchema> = {
            profile: {
                readonly: true,
            },
        }
        expect(getProfileReadonly(state as IStateSchema)).toEqual(true)
    })
    test('should work with empty state', () => {
        const state: DeepPartial<IStateSchema> = {}
        expect(getProfileReadonly(state as IStateSchema)).toEqual(undefined)
    })
})
