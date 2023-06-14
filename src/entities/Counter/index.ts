import { CounterSchema } from './model/types/counterSchema'
import { Counter } from './ui/Counter'
import { counterReducer, counterActions } from './model/slice/counterSlice'

export { counterReducer, counterActions, Counter, CounterSchema }
