import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { useJsonSettings } from '@/entities/User'

// const defaultTheme =
//     (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProdviderProps {
    initialTheme?: Theme
    children: ReactNode
}

const ThemeProvider: FC<ThemeProdviderProps> = (props) => {
    const { children, initialTheme } = props

    // Вначале тему хранили в localStorage, потом стали хранить в Redux (сохранять на сервере)
    const { theme: defaultTheme } = useJsonSettings()

    const [isThemeInited, setThemeInited] = useState(false)

    const [theme, setTheme] = useState<Theme>(
        initialTheme || defaultTheme || Theme.LIGHT,
    )

    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setThemeInited(true)
        }
    }, [defaultTheme, isThemeInited])

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
