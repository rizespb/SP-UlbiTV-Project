import { useEffect } from 'react'

// Если комопнент запущен в Сторибуке, тогда колбэк вызван не будет
// Преимущественно, для начального фетчинга данных с помощью санок
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook') {
            callback()
        }
        // eslint-disable-next-line
    }, [])
}
