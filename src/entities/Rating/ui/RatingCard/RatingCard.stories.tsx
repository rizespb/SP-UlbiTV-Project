import { ComponentStory, ComponentMeta } from '@storybook/react'
import { Theme } from '@/app/providers/ThemeProvider'
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator'
import { RatingCard } from './RatingCard'

export default {
    title: 'shared/RatingCard',
    component: RatingCard,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof RatingCard>

const Template: ComponentStory<typeof RatingCard> = (args) => <RatingCard {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
