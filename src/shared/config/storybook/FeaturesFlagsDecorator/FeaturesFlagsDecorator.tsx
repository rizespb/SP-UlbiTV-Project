import { Story } from '@storybook/react'
import { FeatureFlags } from '@/shared/types/featureFlags'
import { setFeatureFlags } from '@/shared/lib/features'

// Деекоратор для инициализации ФТ в storybook
export const FeaturesFlagsDecorator =
    (features: FeatureFlags) => (StoryComponent: Story) => {
        setFeatureFlags(features)

        return <StoryComponent />
    }
