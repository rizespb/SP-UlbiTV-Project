import { createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react'

type SpringType = typeof import('@react-spring/web')
type GestureType = typeof import('@use-gesture/react')

interface IAnimationContextPayload {
    Gesture?: GestureType
    Spring?: SpringType
    isLoaded?: boolean
}

// Ленивая загрузка библиотек (то есть библиотеки загружаются только, если рендерится компонент, который их использует)
const AnimationContext = createContext<IAnimationContextPayload>({})

// Обе либы зависят друг от друга
// Используем их для того, чтобы можно было свайпом вниз закрывать шторку Drawer
// Основная библиотека @use-gesture/react, но она используется в связке с @react-spring/web
// Сильно не разбирали, как именно работают @use-gesture/react и @react-spring/web. Упор на линивую загрузку библиотек
// Ссылка на документацию https://use-gesture.netlify.app/docs/gestures/
// https://codesandbox.io/s/github/pmndrs/use-gesture/tree/main/demo/src/sandboxes/action-sheet?file=/src/App.jsx
const getAsyncAnimationModules = async () => Promise.all([import('@react-spring/web'), import('@use-gesture/react')])

// При первом рендере Gesture и Spring еще не загружены (useEffect выполнится после отрисовки)
// Поэтому кастуем тип к Required<IAnimationContextPayload>, чтобы каждый раз не проверять в TS: есть ли там значение
// О том, что библиотеки еще не загружены, будет говорить флаг isLoaded = false
export const useAnimationLibs = () => useContext(AnimationContext) as Required<IAnimationContextPayload>

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
    const SpringRef = useRef<SpringType>()
    const GestureRef = useRef<GestureType>()
    const [isLoaded, setIsLoaded] = useState(false)

    // При монтировании компонента осуществляем загрузку библиотек
    useEffect(() => {
        getAsyncAnimationModules().then(([Spring, Gesture]) => {
            SpringRef.current = Spring
            GestureRef.current = Gesture
            setIsLoaded(true)
        })
    }, [])

    // При первом рендере Gesture и Spring еще не загружены (useEffect выполнится после отрисовки)
    // О том, что библиотеки еще не загружены, будет говорить флаг isLoaded = false
    const value = useMemo(
        () => ({
            Gesture: GestureRef.current,
            Spring: SpringRef.current,
            isLoaded,
        }),
        [isLoaded],
    )

    return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}
