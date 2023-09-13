import React from 'react'
import { useJsonSettings } from '@/entities/User'
import ThemeProvider from './ThemeProvider'

export const withTheme = (Component: React.ComponentType) => () => {
    // Вначале тему хранили в localStorage, потом стали хранить в Redux (сохранять на сервере)
    const { theme: defaultTheme } = useJsonSettings()

    return (
        <ThemeProvider initialTheme={defaultTheme}>
            <Component />
        </ThemeProvider>
    )
}
