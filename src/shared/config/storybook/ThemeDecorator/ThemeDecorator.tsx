import { Story } from '@storybook/react'
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider'
import { APP_CONTAINER_ID } from '@/shared/const/app'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`} id={APP_CONTAINER_ID}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    )
