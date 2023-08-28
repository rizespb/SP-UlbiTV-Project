import { useSelector } from 'react-redux'
import { IStateSchema } from '@/app/providers/StoreProvider'

// Селектор: принимает стейт, возвращает часть стейта
type Selector<T> = (state: IStateSchema) => T

// Возвращает нужную часть стейта и сам селектор
type Result<T> = [() => T, Selector<T>]

// Функция принимает селектор
// Оборачивает его в функцию, которая вызывает useSelector для этого селектора
export function buildSelector<T>(selector: Selector<T>): Result<T> {
    const useSelectorHook = () => useSelector(selector)

    return [useSelectorHook, selector]
}
