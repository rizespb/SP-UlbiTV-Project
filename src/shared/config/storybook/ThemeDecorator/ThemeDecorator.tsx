import { Story } from '@storybook/react'
import { Theme } from 'app/providers/ThemeProvider'

// В данном случае декоратор пустой - возвращает вызов истории
// Мы используем его для того, чтобы подключить глобальные стили на второй стро
export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <div className={`app ${theme}`}>
            <StoryComponent />
        </div>
    )
