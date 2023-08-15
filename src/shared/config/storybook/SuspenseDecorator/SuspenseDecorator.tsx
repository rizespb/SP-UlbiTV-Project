import { Suspense } from 'react'
import { Story } from '@storybook/react'

// Декоратор для комопнентов, которые имеют lazy() загрузку, но Suspense для этой lazy-загрузки находится где-то выше по дереву
export const SuspenseDecorator = (StoryComponent: Story) => (
    <Suspense>
        <StoryComponent />
    </Suspense>
)
