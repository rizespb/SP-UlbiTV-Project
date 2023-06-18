import { DeepPartial } from '@reduxjs/toolkit'
import { ILoginSchema } from '../types/loginSchema'
import { loginActions, loginReducer } from './loginSlice'

describe('loginSlice.test', () => {
    test('test set username', () => {
        const state: DeepPartial<ILoginSchema> = { username: '123' }
        expect(loginReducer(state as ILoginSchema, loginActions.setUsername('123123'))).toEqual({ username: '123123' })
    })

    test('test set password', () => {
        const state: DeepPartial<ILoginSchema> = { password: '123' }
        expect(loginReducer(state as ILoginSchema, loginActions.setPassword('123123'))).toEqual({ password: '123123' })
    })
})
