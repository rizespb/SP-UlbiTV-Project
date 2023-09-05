import { useContext } from 'react'
import { Theme } from '../../../const/theme'
import { ThemeContext } from '../../context/ThemeContext'

interface UseThemeResult {
    // toggleTheme принимает колбэк, который сохраняет новое значение темы куда-то, куда мы решим: в localStorage, отправляет на бэк и т.д.
    toggleTheme: (saveAction?: (theme: Theme) => void) => void
    theme: Theme
}

export function useTheme(): UseThemeResult {
    const { theme, setTheme } = useContext(ThemeContext)

    const toggleTheme = (saveAction?: (theme: Theme) => void) => {
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

        setTheme?.(newTheme)
        // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme)
        saveAction?.(newTheme)
    }

    return {
        theme: theme || Theme.LIGHT,
        toggleTheme,
    }
}
