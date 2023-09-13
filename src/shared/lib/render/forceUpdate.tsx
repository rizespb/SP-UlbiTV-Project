import { createContext, ReactNode, useContext, useMemo, useState } from 'react'

const ForceUpdateContext = createContext({
    value: true,
    forceUpdate: () => {},
})

export const useForceUpdate = () => {
    const { forceUpdate } = useContext(ForceUpdateContext)

    return forceUpdate
}

// Это костыль для принудительного обновления интерфейса
// При использовании ФТ isAppRedesigned вознилка следующая ситуация:
// ФТ хранятся в глобальной переменной featureFlags - они не реактивны, при изменении ФТ интерфейс не перерисовывается как в случае хранения данных в Redux или локальном стейте
// Например, если у пользователя был isAppRedesigned=true и он разлогинился, то интерфейс ломается
export function ForceUpdateProvider({ children }: { children: ReactNode }) {
    const [value, setValue] = useState(true)

    // Создаем функцию forceUpdate
    // Она меняет value с true на false
    // Потом таймер через 120 мс меняет обратно с false на true
    // Интерфейс рендерится заново и использует новые значения ФТ
    const forceUpdate = () => {
        setValue((prev) => !prev)
        setTimeout(() => {
            setValue((prev) => !prev)
        }, 120)
    }

    const valueContext = useMemo(() => ({ value, forceUpdate }), [value])

    // Если value false - выводим null (будет небольшое мерцание)
    if (!value) {
        return null
    }

    return (
        <ForceUpdateContext.Provider value={valueContext}>
            {children}
        </ForceUpdateContext.Provider>
    )
}
