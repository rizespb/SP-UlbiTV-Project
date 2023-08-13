import { useEffect } from 'react'

// Если комопнент запущен в Сторибуке, тогда колбэк вызван не будет
// Используется преимущественно, для начального фетчинга данных с помощью санок
export function useInitialEffect(callback: () => void) {
    useEffect(() => {
        if (__PROJECT__ !== 'storybook' && __PROJECT__ !== 'jest') {
            callback()
        }
        // eslint-disable-next-line
    }, [])
}
