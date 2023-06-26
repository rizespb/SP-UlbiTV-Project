import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Theme } from 'app/providers/ThemeProvider'
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator'
import ArticleDetailsPage from './ArticleDetailsPage'

export default {
    title: 'shared/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => <ArticleDetailsPage {...args} />

export const Normal = Template.bind({})
Normal.args = {}
Normal.decorators = [ThemeDecorator(Theme.LIGHT)]
