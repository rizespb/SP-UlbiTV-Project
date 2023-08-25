import { Story } from '@storybook/react'
import { APP_CONTAINER_ID } from '../../../const/app'
// eslint-disable-next-line rizespb-fsd/layer-imports
import { ThemeProvider } from '@/app/providers/ThemeProvider'
import { Theme } from '../../../const/theme'

export const ThemeDecorator = (theme: Theme) => (StoryComponent: Story) =>
    (
        <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`} id={APP_CONTAINER_ID}>
                <StoryComponent />
            </div>
        </ThemeProvider>
    )
