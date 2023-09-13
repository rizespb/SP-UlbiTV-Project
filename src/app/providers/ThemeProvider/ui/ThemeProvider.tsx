import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import { Theme } from '@/shared/const/theme'
import { ThemeContext } from '@/shared/lib/context/ThemeContext'
import { useJsonSettings } from '@/entities/User'
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localstorage'

// const defaultTheme =
//     (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) || Theme.LIGHT

interface ThemeProdviderProps {
    initialTheme?: Theme
    children: ReactNode
}

// Последняя выбранная тема у пользователя на устройстве
// Это нужно, чтобы в момент инициализации приложения (загрузки authData), когда данные с бэка еще не получены и неясно, какая у пользователя выбранна тема,  отображался скелетон с соответствующими теме цветами
const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme

const ThemeProvider: FC<ThemeProdviderProps> = (props) => {
    const { children, initialTheme } = props

    // Вначале тему хранили в localStorage, потом стали хранить в Redux (сохранять на сервере)
    const { theme: defaultTheme } = useJsonSettings()

    const [isThemeInited, setThemeInited] = useState(false)

    const [theme, setTheme] = useState<Theme>(
        initialTheme || fallbackTheme || Theme.LIGHT,
    )

    // После подгрузки jsonSettings с бэка тема будет изменена на хранящуюся в настройках пользователя в БД на бэке
    useEffect(() => {
        if (!isThemeInited && defaultTheme) {
            setTheme(defaultTheme)
            setThemeInited(true)
        }
    }, [defaultTheme, isThemeInited])

    useEffect(() => {
        // Мы добавляем стиль с темой на body, чтобы поддержать стилизацию скролла, т.к. скролл в нашем приложении часто появляется именно на элементе body
        document.body.className = theme

        // При изменении темы сохраняем ее в localStorage
        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme)
    }, [theme])

    const defaultProps = useMemo(() => ({ theme, setTheme }), [theme])

    return (
        <ThemeContext.Provider value={defaultProps}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider
