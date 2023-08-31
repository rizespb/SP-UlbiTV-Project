import { useContext } from 'react'
import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localstorage'
import { Theme } from '../../../const/theme'
import { ThemeContext } from '../../context/ThemeContext'

interface UseThemeResult {
    toggleTheme: () => void
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = () => {
        let newTheme: Theme

        switch (theme) {
            case Theme.DARK:
                newTheme = Theme.LIGHT
                break
            case Theme.LIGHT:
                newTheme = Theme.ORANGE
                break
            case Theme.ORANGE:
                newTheme = Theme.DARK
                break

            default:
                newTheme = Theme.LIGHT
                break
        }

        localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
        setTheme?.(newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
