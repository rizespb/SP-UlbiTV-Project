import { useSelector } from 'react-redux'
import { IStateSchema } from '@/app/providers/StoreProvider'

// Селектор: принимает стейт, возвращает часть стейта
type Selector<T, Args extends any[]> = (state: IStateSchema, ...args: Args) => T

// Тип самого хука: принимает аргументы, возвращает результат вызова селектора, которому будет передан стейт и принятые ранее аргументы
type Hook<T, Args extends any[]> = (...args: Args) => T

// Возвращает нужную часть стейта и сам селектор
type Result<T, Args extends any[]> = [Hook<T, Args>, Selector<T, Args>]

// Функция принимает селектор
// Оборачивает его в функцию, которая вызывает useSelector для этого селектора
export function buildSelector<T, Args extends any[]>(
    selector: Selector<T, Args>,
): Result<T, Args> {
    const useSelectorHook: Hook<T, Args> = (...args: Args) =>
        useSelector((state: IStateSchema) => selector(state, ...args))

    // Отличие useSelectorHook от selector в том, что useSelector принимает аргументы, а selector стейт и аргументы
    return [useSelectorHook, selector]
}
