import { AsyncThunkAction } from '@reduxjs/toolkit'
import axios, { AxiosStatic } from 'axios'
import { IStateSchema } from '@/app/providers/StoreProvider'

type ActionCreatorType<Return, Arg, RejectedValue> = (
    arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios')

// Передаем модуль и флаг true
// true - мокаем не только модуль, но и внутренние поля, например, post
const mockedAxios = jest.mocked(axios, true)

export class TestAsyncThunk<Return, Arg, RejectedValue> {
    dispatch: jest.MockedFn<any>

    getState: () => IStateSchema

    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>

    api: jest.MockedFunctionDeep<AxiosStatic>

    navigate: jest.MockedFn<any>

    constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>, state?: DeepPartial<IStateSchema>) {
        this.actionCreator = actionCreator
        this.dispatch = jest.fn()
        this.getState = jest.fn(() => state as IStateSchema)

        this.api = mockedAxios
        this.navigate = jest.fn()
    }

    async callThunk(arg: Arg) {
        const action = this.actionCreator(arg)

        // третий параметр - какой-то extra
        const result = await action(this.dispatch, this.getState, {
            api: this.api,
            navigate: this.navigate,
        })

        return result
    }
}
