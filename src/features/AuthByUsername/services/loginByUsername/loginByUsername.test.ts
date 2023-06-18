import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { IStateSchema } from 'app/providers/StoreProvider'
import { userActions } from 'entities/User'
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk'
import { loginByUsername } from './loginByUsername'

jest.mock('axios')

// Передаем модуль и флаг true
// true - мокаем не только модуль, но и внутренние поля, например, post
const mockedAxios = jest.mocked(axios, true)

describe('loginByUsername.test', () => {
    let dispatch: Dispatch
    let getState: () => IStateSchema

    beforeEach(() => {
        dispatch = jest.fn()
        getState = jest.fn()
    })

    // test('success login', async () => {
    //     const userValue = { username: '123', id: '1' }

    //     mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

    //     const action = loginByUsername({ username: '123', password: '123' })

    //     const result = await action(dispatch, getState, undefined)

    //     expect(dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))

    //     expect(dispatch).toHaveBeenCalledTimes(3)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('fulfilled')
    //     expect(result.payload).toEqual(userValue)
    // })

    // test('error login', async () => {
    //     mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
    //     const action = loginByUsername({ username: '123', password: '123' })
    //     const result = await action(dispatch, getState, undefined)

    //     expect(dispatch).toHaveBeenCalledTimes(2)
    //     expect(mockedAxios.post).toHaveBeenCalled()
    //     expect(result.meta.requestStatus).toBe('rejected')
    //     expect(result.payload).toBe('Вы ввели неверный логин или пароль')
    // })

    test('success login', async () => {
        const userValue = { username: '123', id: '1' }
        mockedAxios.post.mockReturnValue(Promise.resolve({ data: userValue }))

        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: '123', password: '123' })

        expect(thunk.dispatch).toHaveBeenCalledWith(userActions.setAuthData(userValue))

        // @TODO прояснить
        // Первый вызов dispatch происходит в момент вызова loginByUsername (не понял,почему так)
        // Второй вызов - dispatch(userActions.setAuthData(response.data)) внутри loginByUsername
        /// Третий - диспатч результата loginByUsername
        expect(thunk.dispatch).toHaveBeenCalledTimes(3)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('fulfilled')
        expect(result.payload).toEqual(userValue)
    })

    test('error login', async () => {
        mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }))
        const thunk = new TestAsyncThunk(loginByUsername)
        const result = await thunk.callThunk({ username: '123', password: '123' })

        expect(thunk.dispatch).toHaveBeenCalledTimes(2)
        expect(mockedAxios.post).toHaveBeenCalled()
        expect(result.meta.requestStatus).toBe('rejected')
        expect(result.payload).toBe('Вы ввели неверный логин или пароль')
    })
})
