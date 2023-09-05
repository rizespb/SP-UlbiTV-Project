import { memo, useCallback } from 'react'
import { classNames } from '@/shared/lib/classNames/classNames'
import LightIcon from '@/shared/assets/icons/theme-light.svg'
import DarkIcon from '@/shared/assets/icons/theme-dark.svg'
import { Button, EButtonTheme } from '@/shared/ui/Button'
import { Theme } from '@/shared/const/theme'
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme'
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch'
import { saveJsonSettings } from '@/entities/User'

interface ThemeSwitcherProps {
    className?: string
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme()
    const dispatch = useAppDispatch()

    const onToggleHandler = useCallback(() => {
        // В toggleTheme передаем колбэк, который будет диспатчить вызов санок по сохранению настроек пользователя
        toggleTheme((newTheme) => {
            dispatch(saveJsonSettings({ theme: newTheme }))
        })
    }, [dispatch, toggleTheme])

    return (
        <Button
            theme={EButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={onToggleHandler}
        >
            {theme === Theme.DARK ? <DarkIcon /> : <LightIcon />}
        </Button>
    )
})
