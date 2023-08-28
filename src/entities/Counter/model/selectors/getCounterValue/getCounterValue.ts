// import { createSelector } from '@reduxjs/toolkit'

import { buildSelector } from '@/shared/lib/store'

// Селектор с использованием reselct
// export const getCounterValue = createSelector(
//     getCounter,
//     (counter: ICounterSchema) => counter.value,
// )

// хук useCounterValue используем внутри компонентов
// селектор getCounterValue используем внутри thunk и т.д.
export const [useCounterValue, getCounterValue] = buildSelector((state) => state.counter.value)
