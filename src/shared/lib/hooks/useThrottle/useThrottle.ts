import { useCallback, useRef } from 'react'

// Выполнять колбэк не чаще 1 раза в delay секунд
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
    const throttleRef = useRef(false)

    return useCallback(
        (...args: any[]) => {
            if (!throttleRef.current) {
                callback(...args)
                throttleRef.current = true

                setTimeout(() => {
                    throttleRef.current = false
                }, delay)
            }
        },
        [callback, delay],
    )
}
