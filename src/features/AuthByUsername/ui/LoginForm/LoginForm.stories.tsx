import { ComponentStory, ComponentMeta } from '@storybook/react'

import { LoginForm } from './LoginForm'

export default {
    title: 'features/LoginForm',
    component: LoginForm,
} as ComponentMeta<typeof LoginForm>

// eslint-disable-next-line react/jsx-props-no-spreading
const Template: ComponentStory<typeof LoginForm> = (args) => <LoginForm {...args} />

// Светлую тему подключили глобально в config\storybook\preview.ts
export const Primary = Template.bind({})
Primary.args = {}
